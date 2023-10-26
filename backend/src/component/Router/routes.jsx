import AddAtrribute from "../Attribute/AddAttribute";
import Attributes from "../Attribute/Attributes";
import EditAttribute from "../Attribute/EditAttribute";
import AddBrand from "../Brand/AddBrand";
import Brands from "../Brand/Brands";
import EditBrand from "../Brand/EditBrand";
import AddCategory from "../Category/AddCategory";
import Categories from "../Category/Categories";
import EditCategory from "../Category/EditCategory";
import Dashboard from "../Dashboard/Dashboard";
import AddProduct from "../Product/AddProduct";
import Products from "../Product/Products";
import AddSubSubCategory from "../SubSubCategory/AddSubSubCategory";
import EditSubSubCategory from "../SubSubCategory/EditSubSubCategory";
import SubSubCategories from "../SubSubCategory/SubSubCategories";
import AddSubCategory from "../sub-category/AddSubCategory";
import EditSubCategory from "../sub-category/EditSubCategory";
import SubCategories from "../sub-category/SubCategories";

const routes = [
    {
        name: 'Home',
        path: '',
        key: 'Home',
        component: <Dashboard />
    },
    {
        name: 'Category',
        path: 'categories',
        key: 'Category',
        component: <Categories />
    },
    {
        name: 'Add Category',
        path: 'add-category',
        key: 'Add-Category',
        component: <AddCategory />
    },
    {
        name: 'Edit Category',
        path: 'category/edit/:id',
        key: 'editCategory',
        component: <EditCategory />
    },
    {
        name: 'Sub Category',
        path: 'sub-categories',
        key: 'Sub-Category',
        component: <SubCategories />
    },
    {
        name: 'Add Sub Category',
        path: 'add-sub-category',
        key: 'add-sub-category',
        component: <AddSubCategory />
    },
    {
        name: 'Edit Sub Category',
        path: 'sub-categories/edit/:id',
        key: 'edit-sub-category',
        component: <EditSubCategory />
    },
    {
        name: 'Sub Sub Categories',
        path: 'sub-sub-categories',
        key: 'subSubCategories',
        component: <SubSubCategories />
    },
    {
        name: 'Add Sub Sub Category',
        path: 'sub-sub-category/add',
        key: 'add-sub-sub-category',
        component: <AddSubSubCategory />
    },
    {
        name: 'Edit Sub Sub Category',
        path: 'sub-sub-categories/edit/:id',
        key: 'EditSubSubCategory',
        component: <EditSubSubCategory />
    },
    {
        name: 'Attributes',
        path: 'attributes',
        key: 'Attributes',
        component: <Attributes />
    },
    {
        name: 'Add Attributes',
        path: 'attributes/add',
        key: 'addAttributes',
        component: <AddAtrribute />
    },
    {
        name: 'Edit Attributes',
        path: 'attributes/edit/:id',
        key: 'EditAttribute',
        component: <EditAttribute />
    },
    {
        name: 'Brands',
        path: 'brands',
        key: 'Brand',
        component: <Brands />
    },
    {
        name: 'Add Brand',
        path: 'brands/add',
        key: 'Add Brand',
        component: <AddBrand />
    },
    {
        name: 'Edit Brand',
        path: 'brand/edit/:id',
        key: 'EditBrand',
        component: <EditBrand />
    },
    {
        name: 'Products',
        path: 'products',
        key: 'Products',
        component: <Products />
    },
    {
        name: 'Add Product',
        path: 'products/add',
        key: 'AddProduct',
        component: <AddProduct />
    }
]
export default routes;