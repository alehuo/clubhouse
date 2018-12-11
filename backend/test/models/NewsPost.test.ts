process.env.NODE_ENV = "test";

import { Newspost } from "@alehuo/clubhouse-shared";
import { expect } from "chai";
import "mocha";
import moment from "moment";
import { newsPostFilter } from "../../src/models/INewsPost";
const chai: Chai.ChaiStatic = require("chai");
const should: Chai.Should = chai.should();

describe("INewsPost", () => {
  it("should get and set newspost correctly", (done: Mocha.Done) => {
    const post: Newspost = {
      author: 225,
      created_at: moment(new Date(2018, 1, 2, 13, 44)).toISOString(),
      message: "Welcome!",
      postId: 1,
      title: "Welcome to the clubhouse!",
      updated_at: moment(new Date(2018, 5, 2, 10, 5)).toISOString()
    };
    should.exist(post.author);
    should.exist(post.created_at);
    should.exist(post.message);
    should.exist(post.postId);
    should.exist(post.title);
    should.exist(post.updated_at);

    expect(post.author).to.equal(225);
    expect(post.created_at).to.equal(
      moment(new Date(2018, 1, 2, 13, 44)).toISOString()
    );
    expect(post.message).to.equal("Welcome!");
    expect(post.postId).to.equal(1);
    expect(post.title).to.equal("Welcome to the clubhouse!");
    expect(post.updated_at).to.equal(
      moment(new Date(2018, 5, 2, 10, 5)).toISOString()
    );
    done();
  });

  it("should filter newspost correctly", (done: Mocha.Done) => {
    const post1: Newspost = {
      author: 225,
      created_at: moment(new Date(2018, 1, 2, 13, 44)).toISOString(),
      message: "Welcome!",
      postId: 1,
      title: "Welcome to the clubhouse!",
      updated_at: moment(new Date(2018, 5, 2, 10, 5)).toISOString()
    };

    const post = newsPostFilter(post1);

    should.exist(post.author);
    should.exist(post.created_at);
    should.exist(post.message);
    should.exist(post.postId);
    should.exist(post.title);
    should.exist(post.updated_at);

    expect(post.author).to.equal(225);
    expect(post.created_at).to.equal(
      moment(new Date(2018, 1, 2, 13, 44)).toISOString()
    );
    expect(post.message).to.equal("Welcome!");
    expect(post.postId).to.equal(1);
    expect(post.title).to.equal("Welcome to the clubhouse!");
    expect(post.updated_at).to.equal(
      moment(new Date(2018, 5, 2, 10, 5)).toISOString()
    );
    done();
  });

  it("should get and set newspost correctly, with missing properties non-existent", (done: Mocha.Done) => {
    const post: Newspost = {
      author: 225,
      created_at: moment(new Date(2018, 1, 2, 13, 44)).toISOString(),
      message: "Welcome!",
      title: "Welcome to the clubhouse!"
    };
    should.exist(post.author);
    should.exist(post.created_at);
    should.exist(post.message);
    should.not.exist(post.postId);
    should.exist(post.title);
    should.not.exist(post.updated_at);

    expect(post.author).to.equal(225);
    expect(post.created_at).to.equal(
      moment(new Date(2018, 1, 2, 13, 44)).toISOString()
    );
    expect(post.message).to.equal("Welcome!");
    expect(post.title).to.equal("Welcome to the clubhouse!");
    done();
  });
});
