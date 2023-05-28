'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as Yup from 'yup';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Loading } from './Loading';

const FileSizeLimit = 25 * 1024 * 1024; // 25MB

const validationSchema = Yup.object().shape({
  video: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FileSizeLimit
    )
});

export function NewProject() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      video: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('file', values.video);
        const response = await axios.post("/api/transcribe", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          toast.success('Project successfully created!', {
            onClose: () => router.push(`/project/${response.data.id}`)
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong, please try again.');
      }
    },
  });
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-black shadow-blackA7 max-w-xs ml-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none sm:text-sm">
            New project
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <form onSubmit={formik.handleSubmit} className='grid grid-cols-1 gap-5'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor="video"><b>Video Upload:</b></label>
                <input type='file' id='video' name='video' accept=".mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm" onChange={(event) => { formik.setFieldValue("video", event.currentTarget.files[0]); }} />
                {formik.errors.video ? <div className='text-red-700'><b>{formik.errors.video}</b></div> : null}
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                  File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
                </Dialog.Description>
              </div>
              <button type='submit' disabled={formik.isSubmitting} className="text-white shadow-blackA7 max-w-xs mr-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-gray-500 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                {formik.isSubmitting ? "Loading..." : "Submit"}
              </button>
            </form>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XMarkIcon className="block w-6 text-gray-400" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}