import bcrypt from "bcryptjs";
import { users, products, getNextUserId, getNextProductId } from "./data.js";
import { createToken } from "./auth.js";

export const resolvers = {
    Query: {
        // Список усіх користувачів (без паролів)
        users() {
            return users;
        },

        // Поточний авторизований користувач (із context)
        me(parent, args, context) {
            return context.user;
        },

        // Список товарів канцелярії "PaperCraft"
        products() {
            return products;
        },
    },

    Mutation: {
        // Реєстрація нового користувача
        async register(parent, args) {
            const { name, email, password } = args;
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                throw new Error("Користувач з таким email вже існує.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: getNextUserId(),
                name,
                email,
                password: hashedPassword,
            };

            users.push(newUser);

            return {
                token: createToken(newUser),
                user: newUser,
            };
        },

        // Вхід користувача
        async login(parent, args) {
            const { email, password } = args;
            const user = users.find((item) => item.email === email);
            if (!user) {
                throw new Error("Користувача з таким email не знайдено.");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Неправильний пароль.");
            }

            return {
                token: createToken(user),
                user,
            };
        },

        // Захищена мутація: додати товар канцелярії може лише авторизований користувач
        createProduct(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }

            const product = {
                id: getNextProductId(),
                title: args.title,
                price: args.price,
                category: args.category,
                author: context.user,
            };

            products.push(product);
            return product;
        },

        // Захищена мутація: видалити товар канцелярії
        deleteProduct(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }

            const index = products.findIndex((item) => item.id === args.id);
            if (index === -1) return false;

            products.splice(index, 1);
            return true;
        },
    },
};
