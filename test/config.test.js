/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
let axios = require("axios");

let jsdom = require("mocha-jsdom");
let AuthHttpRequest = require("../index.js").default;
let {
    normaliseSessionScopeOrThrowError,
    normaliseURLPathOrThrowError,
    normaliseURLDomainOrThrowError
} = require("../lib/build/utils");
let assert = require("assert");

/**
 * TODO:
 * - check for default values
 *
 */

describe("Config tests", function() {
    jsdom({
        url: "http://localhost.org"
    });

    beforeEach(async function() {
        global.document = {};
    });

    it("testing sessionScope normalisation", async function() {
        assert(normaliseSessionScopeOrThrowError("api.example.com") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("https://api.example.com") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com?hello=1") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com/hello") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com/") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com:8080") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("http://api.example.com#random2") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("api.example.com/") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError("api.example.com#random") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError(".example.com") === ".example.com");
        assert(normaliseSessionScopeOrThrowError("api.example.com/?hello=1&bye=2") === ".api.example.com");
        assert(normaliseSessionScopeOrThrowError(window.location.hostname) === ".localhost.org");
        try {
            normaliseSessionScopeOrThrowError("http://");
            assert(false);
        } catch (err) {
            assert(err.message === "Please provide a valid sessionScope");
        }
    });

    it("testing URL path normalisation", async function() {
        assert(normaliseURLPathOrThrowError("http://api.example.com") === "");
        assert(normaliseURLPathOrThrowError("https://api.example.com") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com?hello=1") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com/hello") === "/hello");
        assert(normaliseURLPathOrThrowError("http://api.example.com/") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com:8080") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com#random2") === "");
        assert(normaliseURLPathOrThrowError("api.example.com/") === "");
        assert(normaliseURLPathOrThrowError("api.example.com#random") === "");
        assert(normaliseURLPathOrThrowError(".example.com") === "");
        assert(normaliseURLPathOrThrowError("api.example.com/?hello=1&bye=2") === "");
        assert(normaliseURLPathOrThrowError(window.location.hostname) === "");

        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://1.2.3.4/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("1.2.3.4/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("https://api.example.com/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/hello/") === "/hello");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com:8080/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two#random2") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two/#random") === "/one/two");
        assert(normaliseURLPathOrThrowError(".example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two?hello=1&bye=2") === "/one/two");
        assert(normaliseURLPathOrThrowError(window.location.hostname + "/one/two") === "/one/two");

        assert(normaliseURLPathOrThrowError("/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one") === "/one");
        assert(normaliseURLPathOrThrowError("one") === "/one");
        assert(normaliseURLPathOrThrowError("one/") === "/one");
        assert(normaliseURLPathOrThrowError("/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one/two/#random") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two#random") === "/one/two");
    });

    it("testing URL domain normalisation", async function() {
        assert(normaliseURLDomainOrThrowError("http://api.example.com") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("https://api.example.com") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com?hello=1") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/hello") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com:8080") === "http://api.example.com:8080");
        assert(normaliseURLDomainOrThrowError("http://api.example.com#random2") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com#random") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(".example.com") === "https://example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/?hello=1&bye=2") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(window.location.hostname) === "http://localhost.org");
        assert(normaliseURLDomainOrThrowError("localhost") === "http://localhost");
        assert(normaliseURLDomainOrThrowError("https://localhost") === "https://localhost");

        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://1.2.3.4/one/two") === "http://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("https://1.2.3.4/one/two") === "https://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("1.2.3.4/one/two") === "http://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("https://api.example.com/one/two/") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two?hello=1") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two#random2") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/one/two") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/one/two/#random") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(".example.com/one/two") === "https://example.com");
        assert(normaliseURLDomainOrThrowError(window.location.hostname + "/one/two") === "http://localhost.org");

        try {
            normaliseURLDomainOrThrowError("/one/two");
            assert(false);
        } catch (err) {
            assert(err.message === "Please provide a valid domain name");
        }
    });
});
