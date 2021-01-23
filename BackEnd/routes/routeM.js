const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const controllerUtilizador = require("../controllers/controllerUtilizador");
const controllerEquipa = require("../controllers/controllerEquipa");
const controllerOcorrencia = require("../controllers/controllerOcorrencia");
const controllerOperacional = require("../controllers/controllerOperacional");
const controllerMaterial = require("../controllers/controllerMaterial");
const controllerTestemunha = require("../controllers/controllerTestemunha");

router.get("/", function (req, res) {res.send("Pagina principal");});

//Utilizador

router.get("/utilizador", controllerUtilizador.read);
router.put("/utilizador/:username", controllerUtilizador.updateUtilizador);

//Equipa

router.get("/teams", controllerEquipa.read);
router.get("/teams/:id_ocorrencia/view_team", controllerEquipa.readEquipaOcorrencia);
router.get("/teamsRanking", controllerEquipa.readRankingEquipa);
router.get("/teams/:id_equipa/members", controllerEquipa.readMembrosEquipa);
router.put("/teams/:id_equipa/check_team", controllerEquipa.updateConfirmarEquipa);
router.put("/teams/:id_equipa/credit_team", controllerEquipa.updateCreditoEquipa);

//Ocorrencia

router.get("/occurrences", controllerOcorrencia.read);
router.get("/occurrences/finished", controllerOcorrencia.readAcabada);
router.get("/occurrences/:id_ocorrencia", controllerOcorrencia.readOcorrenciaX);
router.get("/occurrences/:id_ocorrencia/read_credit", controllerOcorrencia.readCreditoOcorrenciaX);
router.get("/agents/:id_operacional/accurring", controllerOcorrencia.readOcorrenciaAtual);
router.get("/occurrencesGraphic", controllerOcorrencia.readGrafico);
router.get("/occurrences/:id_ocorrencia/sendmail", controllerOcorrencia.readDadosOcorrencia);
router.get("/occurrences/:id_ocorrencia/timeDiff", controllerOcorrencia.readDiferencaTempo);
router.get("/occurrences/:id_ocorrencia/witnesses", controllerOcorrencia.readTestemunha);
router.put("/occurrences/:id_ocorrencia/credit", controllerOcorrencia.updateCreditoOcorrencia);
router.put("/occurrences/:id_ocorrencia/check_departure", controllerOcorrencia.updateConfirmarPartidaOcorrencia);
router.put("/occurrences/:id_ocorrencia/duration", controllerOcorrencia.updateDuracaoOcorrencia);
router.put("/occurrences/:id_ocorrencia/survival", controllerOcorrencia.updatePercentagemSobrevivente);
router.put("/occurrences/:id_ocorrencia/times", controllerOcorrencia.updateTempoDeslocacao);

//Operacional

router.get("/agents", controllerOperacional.read);
router.get("/agents/:id_operacional/agent", controllerOperacional.readOperacional);
router.get("/agents/:id_operacional/role", controllerOperacional.readEspecialidade);
router.get("/agents/:id_operacional/occurrence", controllerOperacional.readOcorrenciaOperacional);
router.get(
  "/agents/:id_operacional/read_credit",
  controllerOperacional.readCreditoOperacional
);
router.get("/agentsRanking", controllerOperacional.readRankingOperacional);
router.put(
  "/agents/:id_operacional/put_credit",
  controllerOperacional.updateCreditoOperacional
);

//Material

router.get("/materials", controllerMaterial.read);
router.get(
  "/materials/:id_ocorrencia/material",
  controllerMaterial.readMaterialOcorrencia
);
router.get(
  "/materials/:id_material/confirm",
  controllerMaterial.readConfirmarMaterialUsado
);
router.put(
  "/materials/:id_ocorrencia/:id_material/withdraw",
  controllerMaterial.updateConfirmarLevantamento
);

//Testemunha

router.get("/witnesses", controllerTestemunha.read);
router.post(
  "/witnesses/:id_ocorrencia/registration",
  controllerTestemunha.save
);

module.exports = router;
