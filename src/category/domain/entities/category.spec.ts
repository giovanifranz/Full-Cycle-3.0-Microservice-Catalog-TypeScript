import { Category } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    let created_at = new Date();

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

 
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "order description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "order description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    })

    category = new Category({
      name: "Movie",
      created_at
    })

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at
    })
  });

  test("getters of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  })

  test("getters of description field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");
  })

  test("getters of is_active field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  })
});
