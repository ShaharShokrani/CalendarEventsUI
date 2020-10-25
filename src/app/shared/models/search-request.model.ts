export class FilterBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options: {key: string, value: string}[];
  
    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {key: string, value: string}[];
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
    }
}
  
export class TextboxFilter extends FilterBase<string> {
    controlType = 'textbox';
}

export class MultiCheckboxFilter extends FilterBase<string> {
    controlType = 'multicheckbox';
}

export class SearchRequest {
    filters: FilterStatement[];
    orderBy: OrderByStatement;
    includeProperties: string;
}

export class FilterStatement {
    propertyName: string;
    operation: number;
    value: any;
}

export class PropertyName {
    Id: string;
    Label: string;
}

export class OrderByStatement {
    propertyName: string;
    direction: OrderByDirection;
}

export enum FilterOperation {
    Undefined = 0,
    Equal = 1,
    Contains = 2,
    StartsWith = 3,
    EndsWith = 4,
    NotEqual = 5,
    GreaterThan = 6,
    GreaterThanOrEqual = 7,
    LessThan = 8,
    LessThanOrEqual = 9
}

export const Operation_Mapping: Array<{id: FilterOperation, label: string}> = [
    { id: FilterOperation.Undefined, label: 'Nothing' },
    { id: FilterOperation.Equal, label: 'Equals' },
    { id: FilterOperation.Contains, label: 'Contains' },
    { id: FilterOperation.StartsWith, label: 'Starts with' },
    { id: FilterOperation.EndsWith, label: 'Ends with' },
    { id: FilterOperation.NotEqual, label: 'Not equal' },
    { id: FilterOperation.GreaterThan, label: 'Greater than' },
    { id: FilterOperation.GreaterThanOrEqual, label: 'Greater than or Equal' },
    { id: FilterOperation.LessThan, label: 'Less than' },
    { id: FilterOperation.LessThanOrEqual, label: 'Less than or Equal' }
];
export const PropertiesNames_Mapping: Array<{id: string, label: string}> = [
    { id: "IsAllDay", label: 'All Day?' },
    { id: "Start", label: 'Start date' }
];

export enum OrderByDirection
{
    Asc = 0,
    Desc = 1
}