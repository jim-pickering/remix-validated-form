import { DataFunctionArgs, json } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import { withYup } from "@remix-validated-form/with-yup";
import { ValidatedForm } from "remix-validated-form";
import * as yup from "yup";
import { SubmitButton } from "~/components/SubmitButton";

const schema = yup.object({});
const validator = withYup(schema);

export const action = ({ request }: DataFunctionArgs) =>
  json({ message: `Submitted with method ${request.method.toUpperCase()}` });

export default function FrontendValidation() {
  const data = useActionData<typeof action>();
  const fetcher = useFetcher();

  return (
    <>
      <ValidatedForm validator={validator} method="patch">
        {data?.message && <p>{data.message}</p>}
        <SubmitButton label="Submit html form" />
      </ValidatedForm>
      <ValidatedForm fetcher={fetcher} validator={validator} method="patch">
        {data?.message && <p>{data.message}</p>}
        <SubmitButton label="Submit fetcher form" />
      </ValidatedForm>
    </>
  );
}
