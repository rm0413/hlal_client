import { defineStore } from "pinia";

import axios from "axios";
export const useAttachmentsStore = defineStore({
  id: "attachment",
  state: () => ({
    attachments: [],
    attachmentsField: [
      { label: "Selected", key: "selected" },
      { label: "No.", key: "#" },
      { label: "Code", key: "code" },
      { label: "Trial No.", key: "trial_number" },
      { label: "Request Date", key: "request_date" },
      { label: "Supplier", key: "supplier_name" },
      { label: "Part Number", key: "part_number" },
      { label: "Revision", key: "revision" },
      { label: "Dimension", key: "dimension" },
      // { label: "File Path", key: "file_path_attachment" },
    ],
    part_number_select: "",
    search_filter: "",
  }),
  actions: {
    setLoadPartNumber() {
      return new Promise((resolve, reject) => {
        axios
          .get("load-part-number-with-attachment")
          .then((response) => {
            // console.log(response.data)
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setAgreementListCode() {
      return new Promise((resolve, reject) => {
        axios
          .get("load-with-code-attachment")
          .then((response) => {
            resolve(response.data.data);
            this.attachments = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setInsertAttachment(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("attachment", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            resolve(response.data);
            this.setAgreementListCode();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    downloadAttachment(datastorage) {
      return new Promise((resolve, reject) => {
        axios
          .post(`download-attachment`, datastorage, {
            responseType: "blob", headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Request.pdf');
            document.body.appendChild(link);
            link.click();
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    getAttachmentsFields() {
      return this.attachmentsField;
    },
    getAttachment() {
      return this.attachments;
    },
  },
});
