import axios from "axios";

let data = JSON.stringify({
  txn_id: "DBSP2210056",
});
const configs = {
  maxBodyLength: Infinity,
  headers: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZTVkYThmYjE5MWIxMWIxNDMxMDc0MzQwZDQ2YjczMGJkMjVhY2VkY2VmNzJmYTBiNjQ5MzlmYTUzNjg2ZGJlMjEyZTA1YmUxZThiZTEzYWEiLCJpYXQiOjE2NjU3NDY5MzAuNzgyMTE2LCJuYmYiOjE2NjU3NDY5MzAuNzgyMTE5LCJleHAiOjE2OTcyODI5MzAuNzc4NTc4LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.Z-YGA1VVhDfjaneUqkbAgVfPq2Y1-7Rz9_hmPWzKldmXgVPQuKVkPH9f0zSPhgTzymeMHrY1GLWor2ddOSo-xiV2curj7DtWvKDbDAzdc3W6-qeVNVhzqejGT1LzLJ29oIX1f0O0MwZyEdMcQrrzY5owWREZJ4e9e2Kc2A5XWaNBdj8a6LFeiQIlF-G7PPkSw004u-jH0z38VLLnpZmgE_5dJaGO_CLBroHjJFt1SJRt3Gs1jRQrg30t__56HCSneDfUAP_obEoWwqdjs644oITLIUALPh8vJD55EFOFWUwRAZF_cbWtUeHUq0ASjGOcYYLuPqLz2s72F47lLbopC6ATyU-pdNwEhJgOFE0sxJH9HD_gFlQqJXGMHLHiE-xmiFt5C8aojr8fifHq1XNGDcOH9uaKfhdrWMmX6mGllW1xTNJWmIB7bnQstEtqiPtq-pzD9qakZrr1KtTYvmRXBdtR0fsyfNCaOSNZn7aBrrhfNZsIl3rxCN4jF9OyyBKxL0pHcylq6RIBEf_-wUZyEtLL4ibY3FPyWa2UDRRZ0mm5vCr_o1YFgb9fkxI6roFlPiEOElEgZ9KvltEZEpK0HMTkVo__yRT-Thf-50j3K71Q4RwzxmduTXuQCuok1sM8O911Bo-ud3bmgmHjkQHU9MucOJk9YZrcBGhhzriDwRQ",
    "Content-Type": "application/json",
    Authorization: "Basic YWRtaW46QWRtaW4xMjM=",
    Cookie: "JSESSIONID=827C199D9367EC5311C80081A8309169",
  },
};
class HttpRequest {
  static async get(url, token) {
    try {
      const res = await axios({
        method: "GET",
        url: `https://ehr.patholar.com/openmrs/ws/fhir2/R4/${url}`,
        data,
        ...configs,
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  static async post(url, data, token) {
    try {
      const res = await axios({
        method: "POST",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async delete(url, token, data) {
    try {
      const res = await axios({
        method: "DELETE",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err.response);
      return err;
    }
  }

  static async update(url, data, token) {
    try {
      const res = await axios({
        method: "PATCH",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default HttpRequest;
