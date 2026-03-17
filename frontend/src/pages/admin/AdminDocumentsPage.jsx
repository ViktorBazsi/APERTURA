import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { documentService } from '../../services/document.service';
import { uploadService } from '../../services/upload.service';
import { useModal } from '../../context/ModalContext';

const schema = Yup.object({
  title: Yup.string().required('Kötelező'),
  description: Yup.string(),
});

function AdminDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openInfo, openError, openConfirm } = useModal();

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      setDocuments(await documentService.list());
    } catch (error) {
      openError({ title: 'Hiba', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className='grid gap-6 xl:grid-cols-[0.95fr_1.05fr]'>
      <div className='surface p-6'>
        <h1 className='text-3xl'>Dokumentumok</h1>
        <div className='mt-4 space-y-3'>
          {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
          {!isLoading && !documents.length ? <p className='text-canvas/60'>Nincs még dokumentum.</p> : null}
          {documents.map((document) => (
            <div key={document.id} className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-lg'>{document.title}</p>
                  <p className='mt-2 text-sm text-canvas/55'>{document.fileType}</p>
                </div>
                <button type='button' className='rounded-full border border-ember/40 px-3 py-1 text-xs text-ember hover:bg-ember/10' onClick={() => openConfirm({ title: 'Dokumentum törlése', message: `${document.title} törlődik.`, onConfirm: async () => {
                  try {
                    await documentService.remove(document.id);
                    await loadDocuments();
                    openInfo({ title: 'Törölve', message: 'A dokumentum törlése sikeres volt.' });
                  } catch (error) {
                    openError({ title: 'Hiba', message: error.message });
                  }
                } })}>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='surface p-6'>
        <h2 className='text-3xl'>Új dokumentum</h2>
        <Formik
          initialValues={{ title: '', description: '', file: null }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              if (!values.file) {
                throw new Error('PDF fájl szükséges');
              }
              const upload = await uploadService.uploadDocuments('apertura/documents', [values.file]);
              const file = upload.files?.[0];
              await documentService.create({
                title: values.title,
                description: values.description,
                fileUrl: file.url,
                fileType: 'application/pdf',
              });
              resetForm();
              await loadDocuments();
              openInfo({ title: 'Mentve', message: 'A dokumentum feltöltése sikeres volt.' });
            } catch (error) {
              openError({ title: 'Hiba', message: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='mt-6 grid gap-4'>
              <Field name='title' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Cím' />
              {touched.title && errors.title ? <p className='text-sm text-ember'>{errors.title}</p> : null}
              <Field as='textarea' name='description' className='min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Leírás' />
              <input type='file' accept='application/pdf' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm' onChange={(event) => setFieldValue('file', event.currentTarget.files?.[0] || null)} />
              <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white' disabled={isSubmitting}>Feltöltés</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminDocumentsPage;