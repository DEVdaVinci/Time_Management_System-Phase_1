// Replacement for your existing utils/models.tsx. Public names stay the same.
// This file defines types and configuration; it does not transform API data.

// Shared object fields
export interface BaseModel_Detail {
    id: string;
}

export interface BaseModel {
    name: string;
    description?: string;
}

export interface BaseModel_Write extends BaseModel {
    previous_version?: string;
    // Optional so existing create payloads can still omit these fields.
    // The backend serializer must allow them before they can be edited.
    version_number_major?: number;
    version_number_minor?: number;
}

export interface BaseModel_Read extends BaseModel {
    previous_version?: ShallowModel | string;
    date_created: string;
    date_updated: string;
    version_number_major: number;
    version_number_minor: number;
}

// Category: writes use relationship IDs; reads retain nested objects.
export interface BaseCategory {
    is_root: boolean;
}

export interface Category_Write_List extends BaseModel_Write, BaseCategory {
    superior?: string;
    superiors_additional?: string[];
}

export interface Category_Write_Detail
    extends Category_Write_List, BaseModel_Detail {}

export interface Category_Read
    extends BaseModel_Read, BaseModel_Detail, BaseCategory {
    superior?: Category_Write_Detail;
    superiors_additional?: Category_Write_Detail[];
}

// Tag: keep the supplied read contract instead of assuming new backend fields.
export interface Tag_Write_List extends BaseModel_Write {
    superiors?: string[];
}

export interface Tag_Write_Detail
    extends Tag_Write_List, BaseModel_Detail {}

export interface Tag_Read extends BaseModel_Write, BaseModel_Detail {
    superiors?: Tag_Write_Detail[];
}

// Every entry has all four required representations.
// Update still includes id because your existing updateRequest reads payload.id.
type ModelType<Create, Update, Shallow, Deep> = {
    Request_create: Create;
    Request_update: Update;
    Read_shallow: Shallow;
    Read_deep: Deep;
};

type ModelMap = {
    category: ModelType<
        Category_Write_List, Category_Write_Detail,
        Category_Write_Detail, Category_Read
    >;
    tag: ModelType<
        Tag_Write_List, Tag_Write_Detail,
        Tag_Write_Detail, Tag_Read
    >;
};

export type ModelNames = keyof ModelMap;

// Preserve the exported generic map name for existing imports.
export type ModelTypes<M extends ModelNames = ModelNames> = Pick<ModelMap, M>;

export type ShallowModel = ModelMap[ModelNames]["Read_shallow"];
export type CreateRequest<M extends ModelNames> = ModelMap[M]["Request_create"];
export type UpdateRequest<M extends ModelNames> = ModelMap[M]["Request_update"];
export type ListResponse<M extends ModelNames> = ModelMap[M]["Read_shallow"];
export type DetailResponse<M extends ModelNames> = ModelMap[M]["Read_deep"];
export type WriteResponse<M extends ModelNames> = ListResponse<M>;
export type ReadResponse<M extends ModelNames> = DetailResponse<M>;

// Form configuration. Keep optional properties accessible on all fields
// because the existing CreateForm reads field.connection before narrowing.
export type FormBaseField = {
    kind: string;
    name: string;
    connection?: ModelNames;
    multiple?: boolean;
    input_id?: string;
    input_class?: string;
    rows?: number;
};

export type FormField = FormBaseField & (
    | { kind: "text" | "text_area" | "number" | "integer" | "checkbox" }
    | { kind: "connection"; connection: ModelNames; multiple: boolean }
);

export type FormConfig = {
    // Preserve this spelling: the existing CreateForm uses form.feilds.
    feilds: FormField[];
};

interface API_Read {
    single?: string;
    multiple?: string;
}

interface ModelAPIs {
    create?: string;
    read?: API_Read;
    update?: string;
    partial_update?: string;
    delete?: string;
    list: string;
    detailBase: string;
    detail(detailBase: string, id: string): string;
}

export type ModelInfo = {
    model_name: string;
    plural_name: string;
    title: string;
    formConfig: FormConfig;
    APIs: ModelAPIs;
};

function getDetailAPI(detailBase: string, id: string): string {
    return `${detailBase.replace(/\/+$/, "")}/${encodeURIComponent(id)}/`;
}

// One endpoint per model; preserve the API properties existing callers use.
function modelAPIs(endpoint: string): ModelAPIs {
    return { list: endpoint, detailBase: endpoint, detail: getDetailAPI };
}

// Return fresh fields so the two forms do not share mutable field objects.
function commonFields(model: ModelNames): FormField[] {
    return [
        { kind: "text", name: "name" },
        { kind: "text_area", name: "description" },
        {
            kind: "connection", name: "previous_version",
            connection: model, multiple: false,
        },
        { kind: "integer", name: "version_number_major" },
        { kind: "integer", name: "version_number_minor" },
    ];
}

export const models: Record<ModelNames, ModelInfo> = {
    category: {
        model_name: "category",
        plural_name: "categories",
        title: "Category",
        formConfig: {
            feilds: [
                ...commonFields("category"),
                {
                    kind: "connection", name: "superior",
                    connection: "category", multiple: false,
                },
                {
                    kind: "connection", name: "superiors_additional",
                    connection: "category", multiple: true,
                },
                { kind: "checkbox", name: "is_root" },
            ],
        },
        APIs: modelAPIs("api/categories"),
    },
    tag: {
        model_name: "tag",
        plural_name: "tags",
        title: "Tag",
        formConfig: {
            feilds: [
                ...commonFields("tag"),
                {
                    kind: "connection", name: "superiors",
                    connection: "tag", multiple: true,
                },
            ],
        },
        APIs: modelAPIs("api/tags"),
    },
};
