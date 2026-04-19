import { useState } from 'react'
import './App.css'
export default function RecurringPayments() {
  const [surveyData, setsurveyData] = useState({
    title: "Employee Feedback Survey",
    questions: [
      {
        id: 1,
        type: "radio",
        question: "How satisfied are you with your job?",
        options: ["Very satisfied", "Satisfied", "Neutral", "Unsatisfied"]
      },
      {
        id: 2,
        type: "multiselect",
        question: "Which benefits do you use?",
        options: ["Health Insurance", "WFH", "Gym", "Free Lunch"]
      },
      {
        id: 3,
        type: "textarea",
        question: "Any suggestions for improvement?"
      }
    ]
  })

  const getInput = (event) => {
    const { name, type, value } = event.target
    setsurveyData(prev => {
      const questions = prev.questions.map(row => {
        return row.id === name ? { ...row, answer: value } : row
      })
      return { ...prev, questions }
    })
  }
  return (<>
    <div class="row mt-4">
      <div className='col-10 m-auto mt-4 px-5'>
        <h2 className='text-dark text-center mb-4'>{surveyData.title}</h2>
        <div className='pt-3'>
          <ul className="mt-3" style={{ listStyleType: "-moz-initial", marginRight: "40px" }}>
            {
              (surveyData.questions || []).map((row, qInd) => (<li className='mb-4'>
                <h2 style={{ color: "#333436ff", fontSize: "17px", fontWeight: "700", marginTop: "50px" }}>{row?.question}</h2>
                {
                  ['radio', 'checkbox'].includes(row.type) ?
                    row.options.map((op, oInd) => (<div className='mb-2'><input className="me-2 from-checkbox" type={row.type} value={op} name={row.id} onChange={getInput} />{op}</div>))
                    :
                    row.type === 'textarea' ?
                      <textarea className='form-control' name={row.id} key={qInd} onChange={getInput} placeholder='Enter answer' minLength={100} />
                      : row.type === 'multiselect' ?
                        <select className='form-select' name={row.id} key={qInd} onChange={getInput}>
                          {
                            row.options.map((op, oInd) => (<option>{op}</option>))
                          }
                        </select>
                        : <></>
                }
                <hr className='bg-secondary' style={{ height: "1px", opacity: "0.1", margin: "7px 0xp" }} />
              </li>))
            }
          </ul>
        </div>

      </div>
    </div>
  </>)
}
