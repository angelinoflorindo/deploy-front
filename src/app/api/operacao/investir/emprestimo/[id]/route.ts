import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Conta from "@/models/Conta";
import ContaVinculada from "@/models/ContaVinculada";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import Proponente from "@/models/Proponente";
import Solidario from "@/models/Solidario";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { col, fn, literal } from "sequelize";

/**
 * Rotas princiapis
 * proponente : buscar emprestimo validado
 * Investidor: sacar retornos antecipados
 *
 */

