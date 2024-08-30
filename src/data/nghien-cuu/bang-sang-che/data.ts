// src/data/patents/data.ts

export interface Patent {
    stt: number;
    author: string;
    scGphi: string;
    title: string;
    submissionDate: string;
    submissionYear: string;
    applicationNumber: string;
    grantedYear: string;
    grantDate: string;
    documentNumber: string;
    decisionNumber: string;
    department: string;
}

export const patents: Patent[] = [
    {
        stt: 1,
        author: "Lương Ngọc Lợi",
        scGphi: "GPHI",
        title: "Buồng trộn, vòi phun hỗn hợp nước - khí nén dùng trong công nghệ dập bụi làm mát",
        submissionDate: "13-08",
        submissionYear: "2013",
        applicationNumber: "2-2013-00195",
        grantedYear: "2021",
        grantDate: "20-09-21",
        documentNumber: "2719",
        decisionNumber: "14600w/QĐ-SHTT",
        department: "Trường Cơ khí"
    }
];
