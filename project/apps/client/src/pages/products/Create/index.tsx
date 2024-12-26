import {  useNavigate } from "react-router-dom"
import { EFiledName, ELABELS } from "../../../assets/static_string"
import { ANSWERS } from "../../../common/static-data"
import { IconKey } from "../../../componet/atoms/icons"
import CoCoFormPage from "../../../componet/themes/coco/formPage"
import { fetchCreateProduct } from "../../../feature/apiClient/Products"
import { ICreateProduct } from "../../../types/models/IProducts"
import { ISuccessModelProps, OpenSuccessModel, SuccessModel } from "../../../componet/molecules/Modal/SuccessModel"
import { ErrorModel, IErrorModelProps, OpenErrorModel } from "../../../componet/molecules/Modal/ErrorModel"
import { useEffect, useState } from "react"
import { useGetAllCategories } from "../../../feature/query/products/getAllProducts"

export const ProductCreatePage = () =>{

    const navigate = useNavigate();
    const [error,setError] = useState("");

    const getAllCategories = useGetAllCategories();
    useEffect(()=>{
        getAllCategories.mutate()
    },[])



    // const isUpdate = () => {
    //     if(paramState && paramState.id) return true
    //     return false
    // }


    // const onUpdate = async (props:ICreateProduct) => {
    //     // let oldProduct:ICreateProduct = {
    //     //     additionalinfo:paramState.additionalinfo,
    //     //     category_id:paramState.category_id.toString(),
    //     //     description:paramState.name,
    //     //     images:paramState.imagesUrl.length ? [paramState.imagesUrl[0].url] :[] ,
    //     //     name:paramState.name,
    //     //     price:paramState.price.toString(),
    //     //     shop_id:paramState.shop_id.toString(),
    //     //     qty:paramState.price.toString(),
    //     //     delivery_method_id:paramState.delivery_method_id.toString()
    //     // } 
    //     try {
    //         await fetchUpdateProduct(paramState.id.toString(),props)
    //         OpenSuccessModel();
    //     } catch (error:any) {
    //         OpenErrorModel()
    //         setError(error.message)
    //     }
    // }

    const onsubmit = async (props:ICreateProduct) => {

        try {
            await fetchCreateProduct({...props,images:props.images})
            OpenSuccessModel();
        } catch (error:any) {
            OpenErrorModel()
            setError(error.message)
        }
    }
    const generateSuccessModelParam = ():ISuccessModelProps => {
        // if(isUpdate()){
        //     return{
        //         action:{label:ELABELS.close,onClick:()=>{navigate("/owner/products")}},
        //         info:"Successfully Updated",
        //         title:"Product"
        //     }
        // }

        return{
            action:{label:ELABELS.close,onClick:()=>{}},
            info:"Successfully Added",
            title:"Product"
        }
    }

    const generateErrorModelParam = (error:string):IErrorModelProps => {
        return{
            action:{label:ELABELS.close,onClick:()=>{}},
            info:error,
            title:"Error"
        }
    }

    return(
        <div className="w-screen h-full pt-5">
            <SuccessModel {...generateSuccessModelParam()}  />
            <ErrorModel {...generateErrorModelParam(error)}  />
            {/* @ts-ignore */}
            <CoCoFormPage 
                formData={
                    [
                        {
                            fieldName:EFiledName.image,
                            label:ELABELS.image,
                            icon:IconKey.photo,
                            type:"image",
                            // value:getValue("imagesUrl")
                        },
                        {
                            fieldName:EFiledName.description,
                            label:ELABELS.quetion,
                            icon:IconKey.info,
                            type:"text",
                            // value:getValue(EFiledName.name)
                        },
                        {
                            fieldName:EFiledName.correctAnswer,
                            label:ELABELS.Answer,
                            icon:IconKey.success,
                            type:"dropdown",
                            dropDownItem:ANSWERS,
                            // value:getValue(EFiledName.delivery_method_id)
                        },
                        {
                            fieldName:EFiledName.category_key,
                            label:ELABELS.category,
                            icon:IconKey.product,
                            type:"dropdown",
                            dropDownItem:getAllCategories.data?.map(row=>({key:row.id||0,label:row.name}))
                        },
                        {
                            fieldName:EFiledName.ans1,
                            label:ELABELS.Answer1,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        {
                            fieldName:EFiledName.ans2,
                            label:ELABELS.Answer2,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        {
                            fieldName:EFiledName.ans3,
                            label:ELABELS.Answer3,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        {
                            fieldName:EFiledName.ans4,
                            label:ELABELS.Answer4,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        {
                            fieldName:EFiledName.ans5,
                            label:ELABELS.Answer5,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        {
                            fieldName:EFiledName.ans6,
                            label:ELABELS.Answer6,
                            icon:IconKey.question,
                            type:"text",
                            // value:getValue(EFiledName.price)
                        },
                        // {
                        //     fieldName:EFiledName.qty,
                        //     label:ELABELS.qty,
                        //     icon:IconKey.price,
                        //     type:"text",
                        //     value:getValue(EFiledName.price)
                        // },
                        // {
                        //     fieldName:EFiledName.description,
                        //     label:ELABELS.description,
                        //     icon:IconKey.info,
                        //     type:"textarea",
                        //     value:getValue(EFiledName.description)
                        // },
                        // {
                        //     fieldName:EFiledName.category,
                        //     label:ELABELS.category,
                        //     icon:IconKey.category,
                        //     type:"dropdown",
                        //     dropDownItem:PRODUCT_TYPES,
                        //     value:getValue(EFiledName.category)
                        // },
                        // {
                        //     fieldName:EFiledName.delivery_method_id,
                        //     label:ELABELS.delivery_method_id,
                        //     icon:IconKey.category,
                        //     type:"dropdown",
                        //     dropDownItem:DELIVERY_TYPES,
                        //     value:getValue(EFiledName.delivery_method_id)
                        // },
                        // {
                        //     fieldName:EFiledName.additionalinfo,
                        //     label:ELABELS.additionalinfo,
                        //     icon:IconKey.addDocument,
                        //     type:"text",
                        //     value:getValue(EFiledName.additionalinfo)
                        // },
                    ]}
                onSubmit={(data)=>{
                    onsubmit(data)
                }}
                onCancel={()=>{
                    navigate("/owner/products")
                }}
                subTitle={ELABELS.empty}
                title={ELABELS.addQuiz}
            >

            </CoCoFormPage>
        </div>
    )
} 