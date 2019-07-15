import axios from "axios";

const API = {
  CREATE_CUSTOMER:
    "http://ec2-18-219-35-248.us-east-2.compute.amazonaws.com/api/v1/crowdfun/customer/basic/create",
  CUSTOMER_LOGIN:
    "http://ec2-18-219-35-248.us-east-2.compute.amazonaws.com/api/v1/crowdfun/login",
  GET_CROWD_INFO:
    "http://ec2-18-219-35-248.us-east-2.compute.amazonaws.com/api/v1/crowdfun/campaing"
};

const api = "";
// {
// "email":"tom@guru.com.vc",
// "password":"dGVzdGUxMjM=",
// "name": "Tom",
// "surname":"Bernardes"
// }

export function createCustomerBasic(data) {
  if (!data) return;

  axios
    .post(API.CREATE_CUSTOMER, {
      headers: { Token: `${data.password}` },
      ...data
    })
    .then(res => console.log(res));
}

export function customerLogin(data) {
  if (!data) return;
}

export function getDashboardInfo() {
  axios
    .get(API.GET_CROWD_INFO, {
      headers: { Token: "c2VtcHJlZXJyYWFwb3JyYWRvY29yc3ZzZg==" }
    })
    .then(res => console.log(res));
}
