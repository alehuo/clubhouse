import { Key, KeyType, StudentUnion, User } from "@alehuo/clubhouse-shared";
import { shallow } from "enzyme";
import React from "react";
import KeyList from "./KeysList";

const keys: Key[] = [
  {
    keyId: 1,
    keyType: 1,
    unionId: 1,
    userId: 1,
    created_at: "2019-12-30 12:00:00",
    dateAssigned: "2019-12-30 12:00:00",
    description: "Hello World",
    updated_at: "2019-12-30 12:00:00",
  },
];

const studentUnions: StudentUnion[] = [
  {
    unionId: 1,
    name: "Test Student Union",
    description: "Stdu description",
    created_at: "2019-12-30 12:00:00",
    updated_at: "2019-12-30 12:00:00",
  },
];

const keyTypes: KeyType[] = [
  {
    keyTypeId: 1,
    title: "24hr",
    created_at: "2019-12-30 12:00:00",
    updated_at: "2019-12-30 12:00:00",
  },
];

const users: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    permissions: 8,
    userId: 1,
    created_at: "2019-12-30 12:00:00",
    updated_at: "2019-12-30 12:00:00",
  },
];

it("KeyList matches snapshot", () => {
  const cmpnt = shallow(
    <KeyList keys={keys} studentUnions={studentUnions} keyTypes={keyTypes} users={users} />,
  );
  expect(cmpnt).toMatchSnapshot();
});
