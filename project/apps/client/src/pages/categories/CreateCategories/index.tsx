import { FC, useState } from "react";
import { ColumnContainer, RowContainer } from "../../../componet/atoms/Container/FlexContainer";
import { PublicNavBar } from "../../../componet/themes/nav";
import { ISuccessModelProps, OpenSuccessModel, SuccessModel } from "../../../componet/molecules/Modal/SuccessModel";
import { ErrorModel, IErrorModelProps, OpenErrorModel } from "../../../componet/molecules/Modal/ErrorModel";
import CoCoFormPage from "../../../componet/themes/coco/formPage";
import { EFiledName, ELABELS } from "../../../assets/static_string";
import { IconKey } from "../../../componet/atoms/icons";
import { MainContainer } from "../../../componet/atoms/Container/Container";
// import { useNavigate } from "react-router-dom";
import { useCreateCategories } from "../../../feature/query/products/createCategories";
import { ICategory } from "../../../types/models/ICategory";

interface IProps {

}
export const CreateCategories: FC<IProps> = () => {
    const [error, setError] = useState("");
    const createCategoryState = useCreateCategories();
    // const navigate = useNavigate();

    const onSubmit = async (props: ICategory) => {
        try {
            await createCategoryState.mutateAsync(props)
            OpenSuccessModel();
        } catch (error: any) {
            console.warn("ERROR",error)
            OpenErrorModel()
            setError(error.message)
        }
    }

    const generateSuccessModelParam = (): ISuccessModelProps => {
        return {
            action: { label: ELABELS.close, onClick: () => {} },
            info: "Successfully Added",
            title: "Profile"
        }
    }

    const generateErrorModelParam = (error: string): IErrorModelProps => {
        return {
            action: { label: ELABELS.close, onClick: () => { } },
            info: error,
            title: "Error"
        }
    }

    return (
        <ColumnContainer className="min-h-screen w-screen items-center mb-8">

            <PublicNavBar />

            <SuccessModel {...generateSuccessModelParam()} />
            <ErrorModel {...generateErrorModelParam(error)} />

            <MainContainer className="mt-24">
                <RowContainer>
                    {/*@ts-ignore */}
                    <CoCoFormPage
                        formData={
                            [
                                {
                                    fieldName: EFiledName.name,
                                    label: ELABELS.name,
                                    icon: IconKey.name,
                                    type: "text",
                                    // value:oldData?.name
                                },
                                {
                                    fieldName:EFiledName.image,
                                    label:ELABELS.image,
                                    icon:IconKey.photo,
                                    type:"image",
                                    // value:getValue("imagesUrl")
                                },

                            ]}
                        onSubmit={onSubmit}
                        subTitle={ELABELS.empty}
                        title={ELABELS.categories}
                        onCancel={() => { }}
                        hideActionBar

                    >

                    </CoCoFormPage>
                    
                </RowContainer>
            </MainContainer>
        </ColumnContainer>
    )
}