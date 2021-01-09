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
router.put("/users/:username", controllerUtilizador.update);

//Equipa

router.get("/teams", controllerEquipa.read);
router.get("/teams/:creditos_equipa/ranking", controllerEquipa.readRankingEquipa);
router.put("/teams/:id_operacional/check_team", controllerEquipa.confirmarEquipa);

//Ocorrencia

router.get("/occurrences", controllerOcorrencia.read);
router.get('/occurrences/finished', controllerOcorrencia.readAcabadas);
router.get("/occurrences/:id_ocorrencia", controllerOcorrencia.readOcorrenciaX);
router.get("/occurrences/:id_ocorrencia/read_credit", controllerOcorrencia.readCreditoOcorrenciaX);
router.get("/occurrencesGraphic", controllerOcorrencia.readGrafico);
router.put("/occurrences/:id_ocorrencia/credit", controllerOcorrencia.creditoOcorrencia);
router.put("/occurrences/:id_ocorrencia/check_departure", controllerOcorrencia.confirmarPartidaOcorrencia);
router.put("/occurrences/:id_ocorrencia/credit_team", controllerOcorrencia.creditoEquipa);
router.put("/occurrences/:id_ocorrencia/duration", controllerOcorrencia.duracaoOcorrencia);

//Operacional

router.get("/agents", controllerOperacional.read);
router.get("/agents/:id_operacional", controllerOperacional.readEsp);
router.get("/agents/:id_operacional/occurrence", controllerOperacional.readOcorrenciasOperacional);
router.get("/agents/:pontos_gamificacao/ranking", controllerOperacional.readRankingOperacional);

//Material

router.get("/materials", controllerMaterial.read);
router.get("/materials/:id_material/confirm", controllerMaterial.confirmarMaterialUsado);
router.put("/materials/:id_ocorrencia/:id_material/withdraw", controllerMaterial.confirmarLevantamento);

//Testemunha

router.get("/witnesses", controllerTestemunha.read);
router.post("/witnesses/registration", controllerTestemunha.registo);

module.exports = router;
