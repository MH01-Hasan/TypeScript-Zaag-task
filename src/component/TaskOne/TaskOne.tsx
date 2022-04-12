import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from 'react';

const TaskOne = () => {

    const [result, setResult] = useState<any>({})
    const [allData, setAllData] = useState<any[]>([])

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(20)

    let number: number = 0;
    useEffect(() => {
        try {
            setInterval(async () => {
                const res = await axios(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${number}`)
                number++
                if (res.data) {
                    setResult(res?.data);
                    setAllData((prev) => [...prev, res?.data])
                }
            }, 10000)
        } catch (e) {
            console.log(e);
        }
    }, [number])



    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [

        {
            id: 'Sl NO',
            label: 'Sl',
            minWidth: 170,
            fontSize: 24,
            fontWeight: 700
        },

        {
            id: 'Titel',
            label: 'Titel',
            minWidth: 170,
            fontSize: 24,
            fontWeight: 700
        },
        {
            id: 'created_at',
            label: 'created_at',
            minWidth: 170,
            align: 'center',
            fontSize: 24,
            fontWeight: 700,
            format: (value: any) => value.toLocaleString('en-US'),
        },
        {
            id: 'Url',
            label: 'Url',
            minWidth: 170,
            align: 'center',

            format: (value: any) => value.toFixed(2),
        },
    ];


    return (
        <div>
            {!allData.length ? <Box sx={{
                width: '50%', mt: 40, mx: "auto"
            }}>
                <LinearProgress />
            </Box> :
                <Box>
                    <TableContainer sx={{ maxHeight: 550, }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                                <TableRow sx={{ bgcolor: 'info.main' }}>
                                    {columns.map((column: any) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth, fontSize: 24,
                                                fontWeight: 700,

                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allData
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    ?.map(res => res?.hits?.map((data: any, index: number) => {
                                        return (

                                            <TableRow >
                                                <TableCell sx={{ align: 'center', }} >{index + 1}</TableCell>
                                                <TableCell sx={{ align: 'center', }}>{data?.title}</TableCell>
                                                <TableCell sx={{ align: 'center', }}>{data?.created_at}</TableCell>
                                                <TableCell sx={{ align: 'center', }}>{data?.url}</TableCell>
                                            </TableRow>


                                        );
                                    }))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 10]}
                        component="div"
                        count={allData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>

            }



        </div>
    );
};

export default TaskOne;