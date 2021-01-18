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

router.get("/users", controllerUtilizador.read); //geral
router.put("/users/:username", controllerUtilizador.update); //dp login

//Equipa

router.get("/teams", controllerEquipa.read); //geral
router.get(
  "/teams/:creditos_equipa/ranking",
  controllerEquipa.readRankingEquipa
); //80% feito
router.put("/teams/:id_equipa/check_team", controllerEquipa.confirmarEquipa); //dp login

//Ocorrencia

router.get("/occurrences", controllerOcorrencia.read); //dp login
router.get("/occurrences/finished", controllerOcorrencia.readAcabadas); //80% feito
router.get("/occurrences/:id_ocorrencia", controllerOcorrencia.readOcorrenciaX); //dp login
router.get(
  "/occurrences/:id_ocorrencia/read_credit",
  controllerOcorrencia.readCreditoOcorrenciaX
); //possivel
router.get("/occurrencesGraphic", controllerOcorrencia.readGrafico); //80% feito
router.put(
  "/occurrences/:id_ocorrencia/credit",
  controllerOcorrencia.creditoOcorrencia
); //possivel
router.put(
  "/occurrences/:id_ocorrencia/check_departure",
  controllerOcorrencia.confirmarPartidaOcorrencia
); //dp login
router.put(
  "/occurrences/:id_ocorrencia/credit_team",
  controllerOcorrencia.creditoEquipa
); //dp login
router.put(
  "/occurrences/:id_ocorrencia/duration",
  controllerOcorrencia.duracaoOcorrencia
); //dp login

//Operacional

router.get("/agents", controllerOperacional.read); //geral
router.get("/agents/:id_operacional", controllerOperacional.readEsp); //geral
router.get(
  "/agents/:id_operacional/occurrence",
  controllerOperacional.readOcorrenciasOperacional
); //dp login
router.get(
  "/agents/:pontos_gamificacao/ranking",
  controllerOperacional.readRankingOperacional
); //80% feito

//Material

router.get("/materials", controllerMaterial.read); //dp login/ocorrencia atual
router.get(
  "/materials/:id_material/confirm",
  controllerMaterial.confirmarMaterialUsado
); //dp login/ocorrencia atual
router.put(
  "/materials/:id_ocorrencia/:id_material/withdraw",
  controllerMaterial.confirmarLevantamento
); //dp login/ocorrencia atual

//Testemunha

router.get("/witnesses", controllerTestemunha.read); //dp login/ocorrencia atual
router.post("/witnesses/registration", controllerTestemunha.registo); //dp login/ocorrencia atual

module.exports = router;
