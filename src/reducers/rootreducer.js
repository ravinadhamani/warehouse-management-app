import {
  ACCOUNTS_PAGE,
  DASHBOARD_PAGE,
  PRODUCT_PAGE,
  DELETE_PRODUCT_LIST,
  DELETE_CATEGORY_LIST,
  ADD_NEW_PRODUCT,
  ADD_NEW_CATEGORY,
  UPDATE_CALL_API,
  UPDATE_PROFILE,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
  DELETE_USER
} from "../constants.js";

const initialState = {
  accountPage: [],
  productPage: [],
  dashboardPage: [],
  callApi:true,
  LoginStatus:false
};

export default function reducer(state = initialState, action) {
  console.log(action.payload);



  switch (action.type) {
    case IS_LOGGED_IN:
      return{
        ...state,
        LoginStatus:action.payload
      }

      case IS_LOGGED_OUT:
      return{
        ...state,
        LoginStatus:action.payload
      }



    case ACCOUNTS_PAGE:
      return {
        ...state,
        accountPage: action.payload,
      };

    case DASHBOARD_PAGE:
      return {
        ...state,
        productPage: action.payload,
      };

    case PRODUCT_PAGE:
      return {
        ...state,
        dashboardPage: action.payload,
      };
    case DELETE_PRODUCT_LIST:
      return {
        ...state,
        productPage: {
          ...state.productPage,
          products: action.payload,
        },
      };

    case DELETE_CATEGORY_LIST:
      return {
        ...state,
        productPage: {
          ...state.productPage,
          categories: action.payload,
        },
      };

    case ADD_NEW_PRODUCT:
      return {
        ...state,
        productPage: {
          ...state.productPage,
          products: [...state.productPage.products, action.payload],
      
        },
      };

      case ADD_NEW_CATEGORY:
      return {
        ...state,
        productPage: {
          ...state.productPage,
          categories: [...state.productPage.categories, action.payload],
      
        },
      };

      case UPDATE_CALL_API:
        return{
          ...state,
          callApi:false
        }

        case UPDATE_PROFILE:
             return{
              ...state,
              accountPage:{
                ...state.accountPage,
                [action.name]:action.payload
              }
             }

        case DELETE_USER:
          return{
            ...state,
            accountPage:{
              ...state.accountPage,
              [action.payload]:{
                name:"",
                email:"",
                password:"",
                phone:"",
                profilePic:""


              }
            }
            }
          
      

    default:
      return state;
  }
}
