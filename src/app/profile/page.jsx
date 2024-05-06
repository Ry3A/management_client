'use client'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
import styles from './page.module.scss'

export default function ProfilePage() {

    const results = useQueries({
        queries: [
            {
                queryKey: ['users', 1],
                queryFn: () => axios.get('http://localhost:9090/users', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                    },
                }),
                staleTime: Infinity,
            },
            {
                queryKey: ['position', 2],
                queryFn: () => axios.get('http://localhost:9090/position', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                    },
                }),
                staleTime: Infinity,
            },
            {
                queryKey: ['department', 3],
                queryFn: () => axios.get('http://localhost:9090/department', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                    },
                }),
                staleTime: Infinity,
            },
        ],
    })

    console.log(results);


    if (results[0].isFetched) {
        console.log('Users: ', results[0].data.data)
        console.log('Position: ', results[1].data.data)
        console.log('Department: ', results[2].data.data)

        return (
            <main className={styles.main}>

                <table>
                    <caption><h2>Users</h2></caption>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Position</th>
                        <th>Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>
                            <ul>
                                {results[0].data.data.data.map(user => (
                                    <li key={user.id}>{user.id}</li>
                                ))}
                            </ul>
                        </th>
                        <td>
                            <ul>
                                {results[0].data.data.data.map(education => (
                                    <li key={education.id}>{education.email}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {results[0].data.data.data.map(education => (
                                    <li key={education.id}>{education.firstname}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {results[0].data.data.data.map(education => (
                                    <li key={education.id}>{education.lastname}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {results[0].data.data.data.map(user => (
                                    <li key={user.positionId}>
                                        {(results[1].data.data.data.find(position => position.id === user.positionId))?.name}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>

                            <ul>
                                {results[0].data.data.data.map(user => (
                                    <li key={user.positionId}>
                                        {(results[2].data.data.data.find(department => department.id ===
                                            (results[1].data.data.data.find(position => position.id === user.positionId))?.departmentId))?.name}
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