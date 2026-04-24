import express from "express";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import { logs, Log } from "../data/logs";
import { employees } from "../data/employees";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

const router = express.Router();

function getEmployeeList(employeeIds?: string) {
    if (!employeeIds || employeeIds === "all") {
        return employees.map(emp => emp.id);
    }

    return employeeIds.split(",").map(id => id.toLowerCase());
}

router.get("/logs", async (req, res) => {
    try {
        const { start, end, employeeIds } = req.query;
        
        // parse dates and employees
        const employeeList = getEmployeeList(
            typeof employeeIds === "string" ? employeeIds : undefined
        );

        const startDate =
            typeof start === "string" && start !== "all" ? dayjs(start).utc() : null;

        const endDate =
            typeof end === "string" && end !== "all" ? dayjs(end).utc() : null;

        const filteredLogs: Log[] = logs.filter(log => {
            const logDate = dayjs(log.date).utc();
            const employeeMatch = employeeList.includes(log.employeeId.toLowerCase());
            const dateMatch = (!startDate || logDate.isSameOrAfter(startDate)) && (!endDate || logDate.isSameOrBefore(endDate));

            return employeeMatch && dateMatch;
        });

        return res.json({
            ok: true,
            data: filteredLogs
        });
        
    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ ok: false, error: "Internal server error." });
    }
});

export default router;
