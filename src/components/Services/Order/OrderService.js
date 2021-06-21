import React, { Component } from 'react';
import FetchData from '../../FetchRestAPI/FetchData';
import { getParams } from '../../GetSearchedParams/Params';
import { GET_CATEGORY_FOR_ADMIN_PANEL_URL, EDIT_ADMIN_ORDERS_URL, DELETE_ADMIN_ORDERS_URL, GET_ADMIN_ORDERS_URL } from '../../QueryLinks/QueryLinks';
import { GET, POST } from '../../RequestMethods/Methods';

class OrderService extends Component {
    constructor(props) {
    super(props)
     
    this.state = {
        order: null,
        }
    }

    getAdminOrders = async (sorts) => {
        
        let currentPage = getParams("targetPage");
        let sort = getParams("sort");

        const questionQuery = "?a="
        const paramId = "&categoryId=";
        const targetPage = "&targetPage=";
        const sortParam = "&sort=";
        
        if (sort === undefined || sort === null) {
            sort = "";
        }

        if (sorts !== undefined || sorts !== null) {
            sort = sorts;
        }

        if (currentPage === undefined || currentPage === null) {
            currentPage = "1";
        }

        let composeLink = questionQuery;
        const sortParams = sortParam + sort + targetPage;

        composeLink += sortParams;
        
        const result = await FetchData(GET_ADMIN_ORDERS_URL + composeLink + currentPage, null, GET);
        return await result;   
    }

    edit = async (payload) => {
        const result = await FetchData(EDIT_ADMIN_ORDERS_URL, payload, POST);
        return result;
    }

    delete = async (payload) => {
        const result = await FetchData(DELETE_ADMIN_ORDERS_URL, payload, POST);
        return result;
    }
}

export default OrderService;