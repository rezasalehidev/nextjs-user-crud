import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { fetchUsers } from "../store/userSlice";
import { RootState } from "@/store";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, any, any>>(middlewares as any);

describe("fetchUsers", () => {
    it("Test fetch users and check status", async () => {
        const store = mockStore({ users: { users: [], loading: false, error: null, totalPages: 1 } });

        await store.dispatch(fetchUsers(1)); 

        const actions = store.getActions();
        expect(actions[0].type).toEqual(fetchUsers.pending.type);
        expect(actions[1].type).toEqual(fetchUsers.fulfilled.type);

        expect(actions[1].payload.users).toHaveLength(6);
    });
});
