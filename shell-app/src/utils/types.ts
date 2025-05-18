/** Required Keys Utility Type */
type User = {
  id: number;
  name?: string;
  age: number;
};

/**
  id: "id";
  name: never;
  age: "age";
*/
type RemoveOption<T> = {
  [Prop in keyof T]-?: {} extends Pick<T, Prop> ? never : Prop;
};

/** id | age - union of keys */
type RequiredKeysUnion<T> = RemoveOption<T>[keyof T];

/**
  id: number;
  age: number;
*/
type RequiredKeys<T> = Pick<T, RequiredKeysUnion<T>>;

type UserRequired = RequiredKeys<User>;

/** valid */
const DevikaValid: UserRequired = {
  id: 100,
  age: 32,
};

/** invalid: extra property 'name' */
const DevikaInvalid = {
  id: 100,
  age: 32,
  name: "nishant",
};

/** Runtime */
function hasRequiredKeys<T>(
  obj: T,
  requiredKeys: (keyof T)[]
): obj is T & RequiredKeys<T> {
  return requiredKeys.every((key) => obj[key] !== undefined);
}

if (hasRequiredKeys<User>(DevikaInvalid, ["id", "age"])) {
  console.log("Valid user:", DevikaInvalid.id, DevikaInvalid.age);
} else {
  console.log("Missing required keys");
}

const requiredKeys: (keyof User)[] = ["id", "age"];

if (hasRequiredKeys<User>(DevikaValid, requiredKeys)) {
  console.log("DevikaValid has required keys:", DevikaValid);
} else {
  console.log("DevikaValid missing required keys");
}

if (hasRequiredKeys<User>(DevikaInvalid, requiredKeys)) {
  console.log("DevikaInvalid has required keys:", DevikaInvalid);
} else {
  console.log("DevikaInvalid missing required keys");
}
