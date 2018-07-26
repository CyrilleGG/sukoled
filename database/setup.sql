# Dump of table contributions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contributions`;

CREATE TABLE `contributions` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `period` enum('monthly','quarterly') NOT NULL,
  `order` smallint(6) NOT NULL,
  `limit` smallint(6) DEFAULT NULL,
  `threshold` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `department_id` varchar(36) NOT NULL DEFAULT '',
  `user_id` text NOT NULL,
  `unit` enum('percent','million','billion','bp') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `contributions_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table contributions_inputs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contributions_inputs`;

CREATE TABLE `contributions_inputs` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `input_type` enum('textarea','text','file') NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `priority` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contribution_id` varchar(36) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_id` (`contribution_id`),
  CONSTRAINT `contributions_inputs_ibfk_1` FOREIGN KEY (`contribution_id`) REFERENCES `contributions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table contributions_values
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contributions_values`;

CREATE TABLE `contributions_values` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `value` text,
  `contribution_id` varchar(36) NOT NULL DEFAULT '',
  `version_id` varchar(36) NOT NULL,
  `input_id` varchar(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `contribution_id` (`contribution_id`),
  KEY `version_id` (`version_id`),
  KEY `input_id` (`input_id`),
  CONSTRAINT `contributions_values_ibfk_1` FOREIGN KEY (`contribution_id`) REFERENCES `contributions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contributions_values_ibfk_2` FOREIGN KEY (`version_id`) REFERENCES `versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contributions_values_ibfk_3` FOREIGN KEY (`input_id`) REFERENCES `contributions_inputs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table dtm
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dtm`;

CREATE TABLE `dtm` (
  `IDT_PART` varchar(255) NOT NULL DEFAULT '',
  `ANNEE` int(11) NOT NULL,
  `MOIS` int(11) NOT NULL,
  `VERS` int(11) NOT NULL,
  `ID_FIC` varchar(255) NOT NULL DEFAULT '',
  `ID_ROW` int(11) NOT NULL,
  `CD_RAF` varchar(255) DEFAULT NULL,
  `LB_RAF` varchar(255) DEFAULT NULL,
  `CD_INSTRUMENT` varchar(255) DEFAULT NULL,
  `CD_ETAB` varchar(255) DEFAULT NULL,
  `LB_ETAB` varchar(255) DEFAULT NULL,
  `CD_ACTIVITE` varchar(255) DEFAULT NULL,
  `LB_ACTIVITE` varchar(255) DEFAULT NULL,
  `CD_UFO` varchar(255) DEFAULT NULL,
  `CD_UFO_COMM` varchar(255) DEFAULT NULL,
  `MT_EXPO_GLOBAL` bigint(11) DEFAULT NULL,
  `MT_EXPO_NET` bigint(11) DEFAULT NULL,
  `MT_EXPO_ENG` bigint(11) DEFAULT NULL,
  `MT_EXPO_TRESORERIE` int(11) DEFAULT NULL,
  `CD_RAF_TETE` varchar(255) DEFAULT NULL,
  `LB_RAF_TET` varchar(255) DEFAULT NULL,
  `MT_LIMITE_TGR` varchar(255) DEFAULT NULL,
  `CD_PTS_TEMPS_LIMITE_TGR` varchar(255) DEFAULT NULL,
  `IND_INTGPE` int(11) DEFAULT NULL,
  `IND_GBP` int(11) DEFAULT NULL,
  `IND_GCE` int(11) DEFAULT NULL,
  `IND_RAFGEN` tinyint(1) DEFAULT NULL,
  `IND_RAFMDO` smallint(6) DEFAULT NULL,
  `IND_RAFPOOL` tinyint(1) DEFAULT NULL,
  `IND_BAL2` varchar(255) DEFAULT NULL,
  `CD_ACTIVITE_NIV2` varchar(255) DEFAULT NULL,
  `LB_ACTIVITE_NIV2` varchar(255) DEFAULT NULL,
  `CD_RGP_ACTIVITE` varchar(255) DEFAULT NULL,
  `LB_RGP_ACTIVITE` varchar(255) DEFAULT NULL,
  `CD_PAYS_RSK` varchar(255) DEFAULT NULL,
  `LB_PAYS_RSK_RAF` varchar(255) DEFAULT NULL,
  `LB_ZONE_GEO` varchar(255) DEFAULT NULL,
  `CD_ACT_ECO_INT` varchar(255) DEFAULT NULL,
  `LB_CD_ACT_ECO_INT` varchar(255) DEFAULT NULL,
  `CD_PRTF_RSK` varchar(255) DEFAULT NULL,
  `LB_CD_PORTF` varchar(255) DEFAULT NULL,
  `LIB_BAS` varchar(255) DEFAULT NULL,
  `C_CD_PORTF` varchar(255) DEFAULT NULL,
  `CD_NOTE_INT_LIKE_NIX` int(11) DEFAULT NULL,
  `CD_NOTE_INT_LIKE_SP` varchar(255) DEFAULT NULL,
  `IND_IRBF` int(11) DEFAULT NULL,
  `IND_GRD_NOT` varchar(255) DEFAULT NULL,
  `C_NOT_X_SP` int(11) DEFAULT NULL,
  `CD_MNEMO` varchar(255) DEFAULT NULL,
  `CD_SIREN` varchar(255) DEFAULT NULL,
  `CD_SIREN_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_PAYS_RESIDENCE` varchar(255) DEFAULT NULL,
  `LB_PAYS` varchar(255) DEFAULT NULL,
  `CD_PAYS_RSK_RAF_TET` varchar(255) DEFAULT NULL,
  `LB_PAYS_RSK_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_PAYS_ORIGINE_RAF_TET` varchar(255) DEFAULT NULL,
  `LB_PAYS_ORI_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_PRTF_RSK_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NOTE_INT_LIKE_NIX_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NOTE_INT_LIKE_SP_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_CAT_RAF` int(11) DEFAULT NULL,
  `CD_PAYS_ORIGINE` varchar(255) DEFAULT NULL,
  `CD_FORME_JURIDIQUE` int(11) DEFAULT NULL,
  `LB_CAT_JURIDIQUE` varchar(255) DEFAULT NULL,
  `DT_MODIF_NOTE_INT` varchar(255) DEFAULT NULL,
  `LB_PAYS_ORI_RAF` varchar(255) DEFAULT NULL,
  `CD_ZONE_PAYS_RESIDENCE` int(11) DEFAULT NULL,
  `IND_ACTIONNARIAT` varchar(255) DEFAULT NULL,
  `CD_SIT_JUR` int(11) DEFAULT NULL,
  `LB_CD_SUIVI_JURIDIQUE` varchar(255) DEFAULT NULL,
  `CD_TYP_RELATION_RAF` varchar(255) DEFAULT NULL,
  `CD_AGENT_ECO_BAFI` int(11) DEFAULT NULL,
  `LB_AGENT_ECO_BAFI` varchar(255) DEFAULT NULL,
  `DT_CLOTURE` varchar(255) DEFAULT NULL,
  `CD_RAF_RAM` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_SP` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_MOODYS` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_FITCH` varchar(255) DEFAULT NULL,
  `CD_MOTEUR_CIBLE` varchar(255) DEFAULT NULL,
  `CD_MOTEUR_TGR` varchar(255) DEFAULT NULL,
  `DT_NOTE_INT` varchar(255) DEFAULT NULL,
  `IND_STATUT_RAF` varchar(255) DEFAULT NULL,
  `IND_TYP_RAF` varchar(255) DEFAULT NULL,
  `CD_PORTF_MC_DO` varchar(255) DEFAULT NULL,
  `CD_NOTE_INT` varchar(255) DEFAULT NULL,
  `CD_MOTEUR_INT` varchar(255) DEFAULT NULL,
  `CD_METHODE_NOTE` varchar(255) DEFAULT NULL,
  `LB_RAF_ABREG` varchar(255) DEFAULT NULL,
  `CD_NACE` varchar(255) DEFAULT NULL,
  `LB_CD_NACE` varchar(255) DEFAULT NULL,
  `IND_BAL2_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_SP_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_FITCH_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NOTE_EXT_MOODYS_RAF_TET` varchar(255) DEFAULT NULL,
  `CD_NIVW` varchar(255) DEFAULT NULL,
  `DT_EFFW` varchar(255) DEFAULT NULL,
  `COMMENTUM` varchar(255) DEFAULT NULL,
  `IND_CORE_BUSINESS` varchar(255) DEFAULT NULL,
  `IND_BUSINESS_LINE` varchar(255) DEFAULT NULL,
  `DT_FINW` varchar(255) DEFAULT NULL,
  `LGD` varchar(255) DEFAULT NULL,
  `C_NOTE_FINALE` varchar(255) DEFAULT NULL,
  `DT_NOTE_FINALE` varchar(255) DEFAULT NULL,
  `C_GRD_NOTE_FINALE` varchar(255) DEFAULT NULL,
  `C_NOTE_X_SP_FINALE` int(11) DEFAULT NULL,
  `CD_REGRP_ACT_ECO_INT` varchar(255) DEFAULT NULL,
  `LB_REGRP_ACT_ECO_INT` varchar(255) DEFAULT NULL,
  `DT_FIN_NOTE_INT` varchar(255) DEFAULT NULL,
  `AUDIT_INJECT` varchar(255) DEFAULT NULL,
  `AUDIT_REGULAE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table files
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `binary` blob NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version_id` varchar(36) NOT NULL DEFAULT '',
  `contribution_id` varchar(36) NOT NULL,
  `user_id` text NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_id` (`contribution_id`),
  KEY `version_id` (`version_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`contribution_id`) REFERENCES `contributions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `files_ibfk_2` FOREIGN KEY (`version_id`) REFERENCES `versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table policies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `policies`;

CREATE TABLE `policies` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `can_read` tinyint(1) NOT NULL DEFAULT '0',
  `can_write` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` text NOT NULL,
  `contribution_id` varchar(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`(36),`contribution_id`),
  KEY `contribution_id` (`contribution_id`),
  CONSTRAINT `policies_ibfk_1` FOREIGN KEY (`contribution_id`) REFERENCES `contributions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table versions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `versions`;

CREATE TABLE `versions` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `status_admin` enum('done','in progress','on hold','delivered','closed') NOT NULL,
  `status_contributor` enum('done','pending','not delivered','invalid','closed') NOT NULL,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `comment_contributor` text,
  `comment_admin` text,
  `highlight` text,
  `file_binary` blob NOT NULL,
  `file_csv` bit(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_version_id` varchar(36) DEFAULT '',
  `contribution_id` varchar(36) NOT NULL,
  `user_id` text NOT NULL,
  `file_json` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_id` (`contribution_id`),
  CONSTRAINT `versions_ibfk_2` FOREIGN KEY (`contribution_id`) REFERENCES `contributions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
