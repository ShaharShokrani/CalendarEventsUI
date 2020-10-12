export class SearchRequest {
    filters: FilterStatement[];
    orderBy: OrderByStatement;
    includeProperties: string;
}

export class FilterStatement {
    propertyName: string;
    operation: FilterOperation;
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