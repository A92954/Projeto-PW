const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const controllerUtilizador = require("../controllers/controllerUtilizador");
const controllerEquipa = require("../controllers/controllerEquipa");
const controllerOcorrencia = require("../controllers/controllerOcorrencia");
const controllerOperacional = require("../controllers/controllerOperacional");
const controllerMaterial = require("../controllers/controllerMaterial");
const controllerTestemunha = require("../controllers/controllerTestemunha");

router.get("/", function (req, res) {
  res.send("Pagina principal");
});

//Utilizador

router.get("/users", controllerUtilizador.read);
router.put("/users/:username", controllerUtilizador.updateUtilizador);

//Equipa

router.get("/teams", controllerEquipa.read);
router.get("/teams/:id_ocorrencia/view_team", controllerEquipa.readEquipaOcorrencia);
router.get("/teamsRanking", controllerEquipa.readRankingEquipa);
router.put("/teams/:id_equipa/check_team", controllerEquipa.updateConfirmarEquipa);
router.put("/teams/:id_ocorrencia/credit_team", controllerEquipa.updateCreditoEquipa);

//Ocorrencia

router.get("/occurrences", controllerOcorrencia.read);
router.get('/occurrences/finished', controllerOcorrencia.readAcabada);
router.get("/occurrences/:id_ocorrencia", controllerOcorrencia.readOcorrenciaX);
router.get("/occurrences/:id_ocorrencia/read_credit", controllerOcorrencia.readCreditoOcorrenciaX);
router.get("/occurrencesGraphic", controllerOcorrencia.readGrafico);
router.put("/occurrences/:id_ocorrencia/credit", controllerOcorrencia.updateCreditoOcorrencia);
router.put("/occurrences/:id_ocorrencia/check_departure", controllerOcorrencia.updateConfirmarPartidaOcorrencia);
router.put("/occurrences/:id_ocorrencia/duration", controllerOcorrencia.updateDuracaoOcorrencia);
router.put("/occurrences/:id_ocorrencia/survival", controllerOcorrencia.updatePercentagemSobrevivente);

//Operacional

router.get("/agents", controllerOperacional.read);
router.get("/agents/:id_operacional/agent", controllerOperacional.readOperacional);
router.get("/agents/:id_operacional/role", controllerOperacional.readEspecialidade);
router.get("/agents/:id_operacional/occurrence", controllerOperacional.readOcorrenciaOperacional);
router.get("/agents/:id_operacional/credit", controllerOperacional.readCreditoOperacional);
router.get("/agentsRanking", controllerOperacional.readRankingOperacional);

//Material

router.get("/materials", controllerMaterial.read);
router.get("/materials/:id_material/confirm", controllerMaterial.readConfirmarMaterialUsado);
router.put("/materials/:id_ocorrencia/:id_material/withdraw", controllerMaterial.updateConfirmarLevantamento);

//Testemunha

router.get("/witnesses", controllerTestemunha.read);
router.post("/witnesses/registration", controllerTestemunha.save);

module.exports = router;
