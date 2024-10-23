import s from './Resume.module.scss';
import { ReactComponent as FilesIcon } from '../../assets/resume-files.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';
import { useEffect, useRef, useState } from 'react';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import Button from '../../components/UIElements/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
// react-pdf
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const resumeLink =
  'https://drive.google.com/file/d/1ENgbKc5dQ8Z4Ax9VGfokaE8k46EI7JNp/view?usp=sharing';

const SERVICE_ID = 'service_26h3eoi';
const TEMPLATE_ID = 'template_jmka3qk';
const PUBLIC_KEY = 'XpR4CrPcf68g_gqR8';

const Resume = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Your message has been sent!');
          resetForm();
          setSubmitting(false);
        })
        .catch((err) => {
          console.log('FAILED...', err);
          alert('Something went wrong. Please try again.');
          setSubmitting(false);
        });
    },
  });

  const pdfWrapper = useRef(null);
  const [pdfPageWidth, setPdfPageWidth] = useState(null);

  useEffect(() => {
    setPdfPageWidth(
      pdfWrapper.current?.getBoundingClientRect().width || null,
    );
  }, []);

  return (
    <BaseLayout>
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.filesImg}>
            <FilesIcon style={{
                marginRight: '110px'
              }}/>
            <Button
              style={{
                marginLeft: '0',
                width: '100%',
                maxWidth: '200px',
              }} // Responsive button style
              className="primary"
              href={resumeLink}
              target="_blank"
            >
              <DownloadIcon fill="#fff" />
              <span className={s.downloadText}>download resume</span>
              <span className={s.filename}>.pdf</span>
            </Button>
          </div>
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <h1 className={s.title}>
              Connect With <strong className={s.purple}>Me</strong>
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={{ color: 'red' }}>
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red' }}>
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                  }}
                />
                {formik.touched.message && formik.errors.message && (
                  <div style={{ color: 'red' }}>
                    {formik.errors.message}
                  </div>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="primary"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting
                    ? 'Sending...'
                    : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Resume;
