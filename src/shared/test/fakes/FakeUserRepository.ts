import type { User } from "@/modules/users/domain/entities/User";

export class FakeUserRepository {
    private ormRepo: User[];

    constructor() {
        this.ormRepo = [];
    }

    async findById(id: string): Promise<User | null> {
        const user = this.ormRepo.find((user) => user.id === id);

        return user || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.ormRepo.find((user) => user.email === email);

        return user || null;
    }

    async createUser(data: User): Promise<User> {
        const user = {
            id: data.id,
            name: data.name,
            password: data.password,
            email: data.email,
            role: data.role,
            created_at: data.created_at,
            createdTickets: data.createdTickets,
            assignedTickets: data.assignedTickets,
        } as User;

        this.ormRepo.push(user);
        return user;
    }
}
