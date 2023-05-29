import { useForm } from "react-hook-form";

export default function TestForm() {
  const { register, handleSubmit, setFocus, watch } = useForm();

  const handleName = () => {
    const name = watch("name");
  };

  <form onSubmit={handleSubmit(handleName)}>
    <input {...register("name", { required: true })} />
    <button>제출</button>
  </form>;
}
