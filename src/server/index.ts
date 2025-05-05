import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/investments
app.get("/api/investments", (_req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Alpha Fund", amount: 500000, date: "2025-01-15" },
    { id: 2, name: "Beta Series", amount: 1200000, date: "2025-02-20" },
  ]);
});

// POST /api/investments
app.post("/api/investments", (req: Request, res: Response) => {
  const newInv = { id: Date.now(), ...req.body };
  res.status(201).json(newInv);
});

// (Optional) Filter by minimum amount query-param
app.get("/api/investments/filter", (req: Request, res: Response) => {
  const min = Number(req.query.minAmount) || 0;
  const data = [
    { id: 1, name: "Alpha Fund", amount: 500000, date: "2025-01-15" },
    { id: 2, name: "Beta Series", amount: 1200000, date: "2025-02-20" },
  ].filter((inv) => inv.amount >= min);
  res.json(data);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`📡  API server listening on http://localhost:${PORT}`)
);
