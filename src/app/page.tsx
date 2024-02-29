import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const getLatest = await api.post.getLatest.query();
  const getCompanies = await api.company.getCompanies.query();
  const getDebt = await api.debt.getDebt.query();
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-10 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-20 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Debt <span className="text-[hsl(280,100%,70%)]">Tracker</span> App
      </h1>
      <p>{hello.greeting}</p>
      <CrudShowcase />
      <div className="mx-auto flex h-[600px] w-full flex-row gap-4 text-center">
        <div className="basis-1/4 border px-4">
          <h3 className="mt-4 text-lg font-semibold text-[hsl(280,100%,70%)]">
            Posts
          </h3>
          <Table>
            <TableCaption>Recent Posts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{getLatest?.id}</TableCell>
                <TableCell>{getLatest?.name}</TableCell>
                <TableCell>{getLatest?.createdAt.toDateString()}</TableCell>
                <TableCell className="text-right">
                  {getLatest?.updatedAt?.toDateString() ?? "Null"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="basis-1/4 border px-4">
          <h3 className="mt-4 text-lg font-semibold text-[hsl(280,100%,70%)]">
            Companies
          </h3>
          <Table>
            <TableCaption>Company List.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Web Address</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {getCompanies?.id}
                </TableCell>
                <TableCell>{getCompanies?.name}</TableCell>
                <TableCell>{getCompanies?.phone}</TableCell>
                <TableCell>{getCompanies?.webAddress}</TableCell>
                <TableCell>{getCompanies?.createdAt.toDateString()}</TableCell>
                <TableCell className="text-right">
                  {getCompanies?.updatedAt?.toDateString() ?? "Null"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="basis-1/4 border px-4">
          <h3 className="mt-4 text-lg font-semibold text-[hsl(280,100%,70%)]">
            Debt
          </h3>
          <Table>
            <TableCaption>Debt List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Debt type</TableHead>
                <TableHead>Company Id</TableHead>
                <TableHead>Monthly</TableHead>
                <TableHead className="text-right">Amount Owed</TableHead>
                <TableHead className="text-right">Amount Due</TableHead>
                <TableHead className="text-right">Due date</TableHead>
                <TableHead className="text-right">Note</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{getDebt?.id}</TableCell>
                <TableCell>{getDebt?.name}</TableCell>
                <TableCell>{getDebt?.debtType}</TableCell>
                <TableCell>{getDebt?.companyId}</TableCell>
                <TableCell>{getDebt?.isMonthly}</TableCell>
                <TableCell>{getDebt?.amountOwed}</TableCell>
                <TableCell>{getDebt?.amountDue}</TableCell>
                <TableCell>{getDebt?.dueDate}</TableCell>
                <TableCell>{getDebt?.createdAt.toDateString()}</TableCell>
                <TableCell className="text-right">
                  {getDebt?.updatedAt?.toDateString() ?? "Null"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="basis-1/4 border px-4">
          <h3 className="mt-4 text-lg font-semibold text-[hsl(280,100%,70%)]">
            Fourth Col
          </h3>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
