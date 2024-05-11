'use client'

import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
import styles from './page.module.scss'

export default function Home() {

  const results = useQueries({
    queries: [
      {
        queryKey: ['positions', 1],
        queryFn: () => axios.get('http://localhost:9090/position'),
        staleTime: Infinity,
      },
      {
        queryKey: ['department', 2],
        queryFn: () => axios.get('http://localhost:9090/department'),
        staleTime: Infinity,
      },
      {
        queryKey: ['users', 3],
        queryFn: () => axios.get('http://localhost:9090/users', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }),
        staleTime: Infinity,
      },
      {
        queryKey: ['education', 4],
        queryFn: () => axios.get('http://localhost:9090/education', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }),
        staleTime: Infinity,
      },
      {
        queryKey: ['language', 5],
        queryFn: () => axios.get('http://localhost:9090/language', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }),
        staleTime: Infinity,
      },
      {
        queryKey: ['space', 6],
        queryFn: () => axios.get('http://localhost:9090/space', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }),
        staleTime: Infinity,
      },
    ],
  })

console.log(results);

  if (results[0].isFetched && results[1].isFetched && results[2].isFetched) {
    console.log('Positions: ', results[0].data.data)
    console.log('Departments: ', results[1].data.data)
    console.log('Education: ', results[3].data.data)
    console.log('Language: ', results[4].data.data)
    console.log('Space: ', results[5].data.data)
    return (
        <main className={styles.main}>




          <table>
            <caption><h2>Department</h2></caption>
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                <ul>
                {results[1].data.data.data.map(department => (
                    <li key={department.id}>{department.id}</li>
                ))}
                </ul>
              </th>
              <td>
                <ul>
              {results[1].data.data.data.map(department => (
                  <li key={department.id}>{department.name}</li>
              ))}
                  </ul>
              </td>
            </tr>
            </tbody>
          </table>



          <table>
            <caption><h2>Education</h2></caption>
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                <ul>
                  {results[3].data.data.data.map(education => (
                      <li key={education.id}>{education.id}</li>
                  ))}
                </ul>
              </th>
              <td>
                <ul>
                  {results[3].data.data.data.map(education => (
                      <li key={education.id}>{education.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
            </tbody>
          </table>


          <table>
            <caption><h2>Language</h2></caption>
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                <ul>
                  {results[4].data.data.data.map(language => (
                      <li key={language.id}>{language.id}</li>
                  ))}
                </ul>
              </th>
              <td>
                <ul>
                  {results[4].data.data.data.map(language => (
                      <li key={language.id}>{language.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
            </tbody>
          </table>


          <table>
            <caption><h2>Space</h2></caption>
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Footage</th>
              <th>Ante</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                <ul>
                  {results[5].data.data.data.map(space => (
                      <li key={space.id}>{space.id}</li>
                  ))}
                </ul>
              </th>
              <td>
                <ul>
                  {results[5].data.data.data.map(space => (
                      <li key={space.id}>{space.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {results[5].data.data.data.map(space => (
                      <li key={space.id}>{space.footage}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {results[5].data.data.data.map(space => (
                      <li key={space.id}>{space.ante}</li>
                  ))}
                </ul>
              </td>
            </tr>
            </tbody>
          </table>




          <table>
            <caption><h2>Position</h2></caption>
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Department</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                <ul>
                  {results[0].data.data.data.map(position => (
                      <li key={position.id}>{position.id}</li>
                  ))}
                </ul>
              </th>
              <td>
                <ul>
                  {results[0].data.data.data.map(position => (
                      <li key={position.id}>{position.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {results[0].data.data.data.map(position => (
                      <li key={position.id}>{position.salary}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {results[0].data.data.data.map(position => (
                      <li key={position.departmentId}>
                        {(results[1].data.data.data.find(department => department.id === position.departmentId))?.name}
                      </li>
                  ))}
                </ul>

              </td>
            </tr>
            </tbody>
          </table>


        </main>
    )
  } else {
    return <h2>Loading...</h2>
  }


}