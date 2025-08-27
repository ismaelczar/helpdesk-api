import { randomUUID } from "node:crypto";
import type { User } from "@/modules/users/domain/entities/User";

export function makeUser(ovverrides?: Partial<User>): User {
    return {
        id: randomUUID(),
        name: "John Doe",
        password: "123456",
        email: "john@example.com",
        role: "admin",
        created_at: new Date(),
        createdTickets: [],
        assignedTickets: [],
        ...ovverrides,
    };
}
