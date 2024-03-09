import { User, UserStore } from '../user'

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstName: "John Doe",
      lastName: "Doe",
      password_digest: 'pass123'
    });
    expect(result).toEqual({
      user_id: 1,
      firstName: "John Doe",
      lastName: "Doe",
      password_digest: 'pass123'
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        user_id: 1,
        firstName: "John Doe",
        lastName: "Doe",
        password_digest: 'pass123'
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
        user_id: 1,
        firstName: "John Doe",
        lastName: "Doe",
        password_digest: 'pass123'
    });
  });

  it('delete method should remove the book', async () => {
    store.delete(1);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});