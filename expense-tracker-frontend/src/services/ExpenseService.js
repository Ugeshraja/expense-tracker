import axios from "axios";

const BASE_URL = "https://expense-tracker-hi05.onrender.com/api/expenses";

const expenseService = {

    getAllExpenses: () => {
        return axios.get(BASE_URL);
    },

    getExpenseById: (id) => {
        return axios.get(`${BASE_URL}/${id}`);
    },

    createExpense: (expense) => {
        return axios.post(BASE_URL, expense);
    },

    updateExpense: (id, expense) => {
        return axios.put(`${BASE_URL}/${id}`, expense);
    },

    deleteExpense: (id) => {
        return axios.delete(`${BASE_URL}/${id}`);
    }

};

export default expenseService;