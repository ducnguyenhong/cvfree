import '@testing-library/jest-dom/extend-expect'
import { act, render } from '@testing-library/react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { JobListHighSalary } from './job-list-high-salary'

import { ResponseListJob } from 'models/response-api'

const server = setupServer(
  rest.get('/jobs/high-salary/success', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 200,
        data: {
          items: [
            {
              creator: { fullname: 'employer2' },
              company: {
                logo: 'http://127.0.0.1:1234\\uploads\\images\\2fd479b3-1a4a-48fb-8512-bf8cd03d3201.png',
                name: 'Công ty cổ phần Hà Yến 3',
                id: '6088d575d545c80b44dd9faf'
              },
              address: { value: { city: '3', district: '59' }, label: 'Liên Chiểu, Đà Nẵng' },
              salary: { salaryType: 'FROM_TO', salaryFrom: '15000000', salaryTo: '20000000', salaryCurrency: 'VND' },
              career: ['3'],
              recruitmentPosition: ['LEADER'],
              formOfWork: ['FULLTIME'],
              genderRequirement: ['FEMALE'],
              _id: '60ab621aceb1c338746dd75a',
              name: 'ducnh 345',
              timeToApply: 1621930883000,
              numberRecruited: 1,
              jobDescription: '<p>M&ocirc; tả chi tiết về c&ocirc;ng việc đang tuyển dụng 2</p>',
              requirementForCandidate: '<p>Đưa ra c&aacute;c y&ecirc;u cầu về ứng vi&ecirc;n cần tuyển dụng 2</p>',
              benefitToEnjoy: '<p>N&ecirc;u c&aacute;c quyền lợi m&agrave; ứng vi&ecirc;n sẽ được hưởng 2</p>',
              status: 'ACTIVE',
              createdAt: '2021-05-24T08:21:46.634Z',
              updatedAt: '2021-05-24T15:22:16.670Z',
              id: 12
            }
          ],
          pagination: { page: 1, size: 20, totalPages: 1, totalItems: 1 }
        },
        success: true,
        message: 'GET_DATA_SUCCESS'
      })
    )
  }),
  rest.get('/jobs/high-salary/empty', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 200,
        data: { items: [], pagination: { page: 1, size: 20, totalPages: 1, totalItems: 0 } },
        success: true,
        message: 'GET_DATA_SUCCESS'
      })
    )
  }),
  rest.get('/jobs/high-salary/server-error', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 400,
        data: null,
        success: false,
        error: { message: 'NOT_EXISTS_CURSOR' }
      })
    )
  }),
  rest.get('/jobs/high-salary/loading', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: '200',
        data: undefined
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const getDataFromApi = (url: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 20000,
    params: { page: 1, size: 20 }
  }
  return axios
    .get(url, config)
    .then((response: AxiosResponse<ResponseListJob>) => {
      const { data } = response.data
      return data
    })
    .catch((error) => {
      throw new Error(error?.message)
    })
}

test('1. Exist List Job', async () => {
  await act(async () => {
    getDataFromApi('/jobs/high-salary/success')
      .then((data) => {
        const { findByTestId } = render(
          <Router>
            <Router>
              <JobListHighSalary defaultData={data} />
            </Router>
          </Router>
        )
        const jobList = findByTestId('job-list-success')
        expect(jobList).toBeTruthy()
      })
      .catch((e) => {
        throw new Error(e?.message)
      })
  })
})

test('2. Data Empty From Server', async () => {
  await act(async () => {
    getDataFromApi('/jobs/high-salary/empty')
      .then((data) => {
        const { findByTestId } = render(
          <Router>
            <JobListHighSalary defaultData={data} />
          </Router>
        )
        const jobList = findByTestId('job-list-empty')
        expect(jobList).toBeTruthy()
      })
      .catch((e) => {
        throw new Error(e?.message)
      })
  })
})

test('3. Exist Loading', async () => {
  await act(async () => {
    getDataFromApi('/jobs/high-salary/loading')
      .then((data) => {
        const { findByTestId } = render(
          <Router>
            <JobListHighSalary defaultData={data} />
          </Router>
        )
        const jobList = findByTestId('job-list-loading')
        expect(jobList).toBeTruthy()
      })
      .catch((e) => {
        throw new Error(e?.message)
      })
  })
})

test('4. Error From Server', async () => {
  await act(async () => {
    getDataFromApi('/jobs/high-salary/server-error')
      .then((data) => {
        const { findByTestId } = render(
          <Router>
            <JobListHighSalary defaultData={data} />
          </Router>
        )
        const jobList = findByTestId('job-list-error')
        expect(jobList).toBeTruthy()
      })
      .catch((e) => {
        throw new Error(e?.message)
      })
  })
})
