export interface FilterTicketsDTO {
    status?: string;
    type?: string;
    protocol?: string;
    customer_id?: string;
    assigned_agent_id?: string;
    created_from?: Date;
    created_to?: Date;
}
