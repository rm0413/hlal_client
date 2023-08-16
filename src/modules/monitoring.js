import { defineStore } from "pinia";
import axios from "axios";

export const useMonitoringStore = defineStore({
  id: "monitoring",
  state: () => ({
    monitoring: [],
    inputStatus: true,
    monitoringFields: [
      // { label: 'Select', key: 'select' },
      { label: "Action", key: "action" },
      { label: "Item No.", key: "id" },
      { label: "Unit Name", key: "unit_name" },
      { label: "Supplier", key: "supplier_name" },
      { label: "Part Number", key: "part_number" },
    ],
    monitoringEditItemForm: {
      id: null,
      trial_number: null,
      request_date: null,
      additional_request_date: null,
      tri_number: null,
      tri_quantity: null,
      request_person: null,
      supperior_approval: null,
      supplier_name: null,
      part_number: null,
      sub_part_number: null,
      revision: null,
      coordinates: null,
      dimension: null,
      actual_value: null,
      critical_parts: null,
      critical_dimension: null,
      kind_request: null,
      request_value: null,
      request_quantity: null,
      unit_id: null,
    },
    monitoringEditFields: [
      { label: "No", key: "#" },
      { label: "Code", key: "code" },
      { label: "Trial Number.", key: "trial_number" },
      { label: "Request Date", key: "request_date" },
      { label: "TRI No.", key: "tri_number" },
      { label: "Supplier", key: "supplier_name" },
      { label: "Part Number", key: "part_number" },
      { label: "Revision", key: "revision" },
      { label: "Action", key: "action" },
    ],
    monitoringAttachmentFields: [
      { label: "No.", key: "#" },
      { label: "Request Date", key: "request_date" },
      { label: "Part Number", key: "part_number" },
      { label: "Action", key: "action" },
    ],
    monitoringDesignerFields: [
      { label: "No.", key: "#" },
      { label: "Trial No.", key: "trial_number" },
      { label: "Request Date", key: "request_date" },
      { label: "TRI No.", key: "tri_number" },
      { label: "Part Number", key: "part_number" },
      { label: "Sub Part Number", key: "sub_part_number" },
      { label: "Revision", key: "revision" },
      { label: "Coordinates", key: "coordinates" },
      { label: "Dimension", key: "dimension" },
      { label: "Actual Value", key: "actual_value" },
      { label: "Kind of Request", key: "request_type" },
      { label: "Request Value", key: "request_value" },
      { label: "Request Quantity", key: "request_quantity" },
      { label: "Designer Answer", key: "designer_answer" },
      { label: "Designer in charge", key: "designer_in_charge" },
      { label: "Answer Date", key: "answer_date" },
    ],
    monitoringForm: {
      monitoring_unit_name: "",
      monitoring_supplier: "",
      monitoring_part_number: "",
    },
    monitoringItems: [],
    monitoringEditItems: [],
    monitoringAttachmentItems: [],
    onEdit: false,
    onEditIndex: null,
    units: [],
  }),
  actions: {
    setClearEditMonitoring() {
      this.inputStatus = true;
      this.monitoringEditItemForm = {
        trial_number: null,
        request_date: null,
        additional_request_date: null,
        tri_number: null,
        tri_quantity: null,
        request_person: null,
        supperior_approval: null,
        supplier_name: null,
        part_number: null,
        sub_part_number: null,
        revision: null,
        coordinates: null,
        dimension: null,
        actual_value: null,
        critical_parts: null,
        critical_dimension: null,
        kind_request: null,
        request_value: null,
        request_quantity: null,
        unit_id: null,
      };
    },
    setUnits() {
      return new Promise((resolve, reject) => {
        axios
          .get("unit")
          .then((response) => {
            resolve(response.data.data);
            // console.log(response.data)
            this.units = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setDeleteMonitoring(data) {
      var payload = {
        id: data.agreement_id_pk,
        emp_id: sessionStorage.getItem('employee_id'), 
      }
      return new Promise((resolve, reject) => {
        axios
          .delete(`delete-monitoring/${payload.id}/${payload.emp_id}`)
          .then((response) => {
            resolve(response.data);
            this.setEditMonitoringList()
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUpdateMonitoring() {
      var payload = {
        id: parseInt(this.monitoringEditItemForm.id),
        trial_number: this.monitoringEditItemForm.trial_number,
        request_date: this.monitoringEditItemForm.request_date,
        additional_request_qty_date: this.monitoringEditItemForm.additional_request_date,
        tri_number: this.monitoringEditItemForm.tri_number,
        tri_quantity: this.monitoringEditItemForm.tri_quantity,
        request_person: this.monitoringEditItemForm.request_person,
        superior_approval: this.monitoringEditItemForm.supperior_approval,
        supplier_name: this.monitoringEditItemForm.supplier_name,
        part_number: this.monitoringEditItemForm.part_number,
        sub_part_number: this.monitoringEditItemForm.sub_part_number,
        revision: this.monitoringEditItemForm.revision,
        coordinates: this.monitoringEditItemForm.coordinates,
        dimension: this.monitoringEditItemForm.dimension,
        actual_value: this.monitoringEditItemForm.actual_value,
        critical_parts: this.monitoringEditItemForm.critical_parts,
        critical_dimension: this.monitoringEditItemForm.critical_dimension,
        request_type: this.monitoringEditItemForm.kind_request,
        request_value: this.monitoringEditItemForm.request_value,
        request_quantity: this.monitoringEditItemForm.request_quantity,
        unit_id: this.monitoringEditItemForm.unit_id,
        requestor_employee_id: sessionStorage.getItem("employee_id"),
      };
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(`agreement-list/${payload.id}`, payload)
          .then((response) => {
            resolve(response.data);
            // this.setEditMonitoringList();
            this.setClearEditMonitoring()
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUnit() {
      console.log(this.monitoringForm.monitoring_unit_name);
    },
    setLoadMonitoring() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `show-monitoring-list/${this.monitoringForm.monitoring_unit_name}/${this.monitoringForm.monitoring_supplier}/${this.monitoringForm.monitoring_part_number}`
          )
          .then((response) => {
            resolve(response.data);
            this.monitoringItems = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setEditMonitoringList(data) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `show-monitoring-list-edit/${data.unit_id}/${data.supplier_name}/${data.part_number}`
          )
          .then((response) => {
            resolve(response.data);
            this.monitoringEditItems = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setAttachmentMonitoringList(data) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `show-monitoring-list-attachment/${data.unit_id}/${data.supplier_name}/${data.part_number}`
          )
          .then((response) => {
            resolve(response.data);
            this.monitoringAttachmentItems = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setExportMonitoringList(data) {
      window.open(
        `http://10.164.58.65/hinsei/server/public/export/${data[0].unit_id}/${data[0].supplier_name}/${data[0].part_number}`
      )
    },
  },
  getters: {
    getMonitoringFields() {
      return this.monitoringFields;
    },
    getAttachmentMonitoringFields() {
      return this.monitoringAttachmentFields;
    },
    getDesignerMonitoringFields() {
      return this.monitoringDesignerFields;
    },
    getEditMonitoringItems() {
      return this.monitoringEditItems;
    },
    getAttachmentMonitoringItems() {
      return this.monitoringAttachmentItems;
    },
    getEditMonitoringFields() {
      return this.monitoringEditFields;
    },
    getUnit() {
      return this.units;
    },
    getLoadMonitoring() {
      return this.monitoringItems;
    },
  },
});
