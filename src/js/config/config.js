"use strict";
export const ajaxTimeout = 1000;

let temp_ajax_url = window.location.href.match('http(s?)://(.*?)/')[0];

// local
if  (window.location.href.includes("localhost")) {
    temp_ajax_url = "http://127.0.0.1:12345";
}

export const ajaxURL = temp_ajax_url;
