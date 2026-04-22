import logFilter from "./logFilter";
import { buildChain } from "./chains/buildChain";

async function askAI(query: string) {
    const filteredLogs = logFilter(query).selectedLogs;

    if (!filteredLogs?.length) {
        return {
            ok: false,
            error: "askAI error: No matching logs for the given query/date range.",
        };
    }

    const chain = await buildChain(filteredLogs);

    return await chain.invoke(query);
}

export default askAI;
