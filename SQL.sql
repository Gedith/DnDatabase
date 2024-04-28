-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 28. dub 2024, 12:43
-- Verze serveru: 10.4.32-MariaDB
-- Verze PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `semestralni_prace`
--

DELIMITER $$
--
-- Procedury
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `oddelHracskouPostavu_kampaneID` (IN `id` INT)   UPDATE hracskepostavy
SET hracskepostavy.KampaneID = NULL
WHERE hracskepostavy.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazkampan` (IN `id` INT)   call oddelHracskouPostavu_kampaneID(id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazKampan_kampaneID` (IN `id` INT)   DELETE FROM kampane
WHERE kampane.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazKytky_kampaneID` (IN `id` INT)   DELETE kytky FROM kytky
INNER JOIN svety on kytky.SvetyID = svety.SvetyID
WHERE svety.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazMapy_kampaneID` (IN `id` INT)   DELETE mapy FROM mapy
INNER JOIN svety ON mapy.SvetyID = svety.SvetyID
WHERE svety.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazMesta_kampaneID` (IN `id` INT)   DELETE mesta from mesta
INNER JOIN mapy on mesta.MapyID = mesta.MapyID
INNER JOIN svety on mapy.SvetyID = svety.SvetyID
WHERE svety.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazNPC_kampaneID` (IN `id` INT)   DELETE npcpostavy FROM npcpostavy
INNER JOIN svety ON npcpostavy.SvetyID = svety.SvetyID
WHERE svety.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazPravidla_kampaneID` (IN `id` INT)   DELETE pravidla FROM pravidla
WHERE pravidla.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazSvet_kampaneID` (IN `id` INT)   DELETE FROM svety
WHERE svety.KampaneID = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `smazZivocichy_kampaneID` (IN `id` INT)   DELETE zivocichove FROM zivocichove
INNER JOIN svety ON zivocichove.SvetyID = svety.SvetyID
WHERE svety.KampaneID = id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabulky `hracskepostavy`
--

CREATE TABLE `hracskepostavy` (
  `Jmeno` varchar(255) NOT NULL,
  `Povolani` varchar(255) NOT NULL,
  `Rasa` varchar(255) NOT NULL,
  `Uroven` int(11) NOT NULL,
  `Strength` int(11) NOT NULL DEFAULT 0,
  `Dexterity` int(11) NOT NULL DEFAULT 0,
  `Intelligence` int(11) NOT NULL DEFAULT 0,
  `Charisma` int(11) NOT NULL DEFAULT 0,
  `Constitution` int(11) NOT NULL DEFAULT 0,
  `Wisdom` int(11) NOT NULL DEFAULT 0,
  `Popisek` varchar(250) DEFAULT NULL,
  `HracskepostavyID` int(11) NOT NULL,
  `KampaneID` int(11) DEFAULT NULL,
  `UzivateleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `kampane`
--

CREATE TABLE `kampane` (
  `Nazev` varchar(255) NOT NULL,
  `KampaneID` int(11) NOT NULL,
  `UzivateleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggery `kampane`
--
DELIMITER $$
CREATE TRIGGER `logKampane` AFTER DELETE ON `kampane` FOR EACH ROW INSERT INTO logmazanikampani (logmazanikampani.KampaneID, logmazanikampani.DatumCas)
VALUES (OLD.KampaneID, CURRENT_TIME)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabulky `kytky`
--

CREATE TABLE `kytky` (
  `Mistovyskytu` varchar(255) DEFAULT NULL,
  `Nazev` varchar(255) NOT NULL,
  `Vlastnosti` varchar(255) DEFAULT NULL,
  `KytkyID` int(11) NOT NULL,
  `SvetyID` int(11) DEFAULT NULL,
  `ViditelneHraci` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `logmazanikampani`
--

CREATE TABLE `logmazanikampani` (
  `KampaneID` int(11) NOT NULL,
  `DatumCas` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `mapy`
--

CREATE TABLE `mapy` (
  `Nazev` varchar(255) NOT NULL,
  `MapyID` int(11) NOT NULL,
  `SvetyID` int(11) DEFAULT NULL,
  `ViditelneHraci` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `mesta`
--

CREATE TABLE `mesta` (
  `Nazev` varchar(255) NOT NULL,
  `Poloha` varchar(255) DEFAULT NULL,
  `Popis` varchar(255) DEFAULT NULL,
  `MestaID` int(11) NOT NULL,
  `MapyID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `npcpostavy`
--

CREATE TABLE `npcpostavy` (
  `Jmeno` varchar(255) NOT NULL,
  `Poloha` varchar(255) DEFAULT NULL,
  `Popis` varchar(255) DEFAULT NULL,
  `Povolani` varchar(255) DEFAULT NULL,
  `Rasa` varchar(255) DEFAULT NULL,
  `ViditelneHraci` tinyint(1) NOT NULL DEFAULT 0,
  `PopisSchopnosti` varchar(500) DEFAULT NULL,
  `NpcpostavyID` int(11) NOT NULL,
  `SvetyID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pravidla`
--

CREATE TABLE `pravidla` (
  `Pravidla` varchar(255) DEFAULT NULL,
  `PravidlaID` int(11) NOT NULL,
  `KampaneID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `schopnosti`
--

CREATE TABLE `schopnosti` (
  `Nazev` varchar(255) DEFAULT NULL,
  `Popis` varchar(255) DEFAULT NULL,
  `HracskepostavyID` int(11) NOT NULL,
  `SchopnostiID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `svety`
--

CREATE TABLE `svety` (
  `JmenoSveta` varchar(50) NOT NULL,
  `SvetyID` int(11) NOT NULL,
  `KampaneID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `uzivatele`
--

CREATE TABLE `uzivatele` (
  `Heslo` varchar(255) NOT NULL,
  `Jmeno` varchar(255) NOT NULL,
  `UzivateleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `zivocichove`
--

CREATE TABLE `zivocichove` (
  `Druh` varchar(255) DEFAULT NULL,
  `Nazev` varchar(255) NOT NULL,
  `Popis` varchar(255) DEFAULT NULL,
  `SvetyID` int(11) DEFAULT NULL,
  `ViditelneHraci` tinyint(1) NOT NULL DEFAULT 0,
  `ZivocichoveID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `hracskepostavy`
--
ALTER TABLE `hracskepostavy`
  ADD PRIMARY KEY (`HracskepostavyID`),
  ADD KEY `FK_Hracskepostavy_Kampane` (`KampaneID`),
  ADD KEY `FK_Hracskepostavy_Uzivatele` (`UzivateleID`);

--
-- Indexy pro tabulku `kampane`
--
ALTER TABLE `kampane`
  ADD PRIMARY KEY (`KampaneID`),
  ADD KEY `FK_Kampane_Uzivatele` (`UzivateleID`);

--
-- Indexy pro tabulku `kytky`
--
ALTER TABLE `kytky`
  ADD PRIMARY KEY (`KytkyID`),
  ADD KEY `FK_Kytky_Svety` (`SvetyID`);

--
-- Indexy pro tabulku `mapy`
--
ALTER TABLE `mapy`
  ADD PRIMARY KEY (`MapyID`),
  ADD KEY `FK_Mapy_Svety` (`SvetyID`);

--
-- Indexy pro tabulku `mesta`
--
ALTER TABLE `mesta`
  ADD PRIMARY KEY (`MestaID`),
  ADD KEY `FK_Mesta_Mapy` (`MapyID`);

--
-- Indexy pro tabulku `npcpostavy`
--
ALTER TABLE `npcpostavy`
  ADD PRIMARY KEY (`NpcpostavyID`),
  ADD KEY `FK_Npcpostavy_Svety` (`SvetyID`);

--
-- Indexy pro tabulku `pravidla`
--
ALTER TABLE `pravidla`
  ADD PRIMARY KEY (`PravidlaID`),
  ADD KEY `KampaneID` (`KampaneID`);

--
-- Indexy pro tabulku `schopnosti`
--
ALTER TABLE `schopnosti`
  ADD PRIMARY KEY (`SchopnostiID`),
  ADD KEY `HracskepostavyID` (`HracskepostavyID`);

--
-- Indexy pro tabulku `svety`
--
ALTER TABLE `svety`
  ADD PRIMARY KEY (`SvetyID`),
  ADD KEY `KampaneID` (`KampaneID`);

--
-- Indexy pro tabulku `uzivatele`
--
ALTER TABLE `uzivatele`
  ADD PRIMARY KEY (`UzivateleID`);

--
-- Indexy pro tabulku `zivocichove`
--
ALTER TABLE `zivocichove`
  ADD PRIMARY KEY (`ZivocichoveID`),
  ADD KEY `SvetyID` (`SvetyID`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `hracskepostavy`
--
ALTER TABLE `hracskepostavy`
  MODIFY `HracskepostavyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `kampane`
--
ALTER TABLE `kampane`
  MODIFY `KampaneID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `kytky`
--
ALTER TABLE `kytky`
  MODIFY `KytkyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `mapy`
--
ALTER TABLE `mapy`
  MODIFY `MapyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `mesta`
--
ALTER TABLE `mesta`
  MODIFY `MestaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `npcpostavy`
--
ALTER TABLE `npcpostavy`
  MODIFY `NpcpostavyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `pravidla`
--
ALTER TABLE `pravidla`
  MODIFY `PravidlaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `schopnosti`
--
ALTER TABLE `schopnosti`
  MODIFY `SchopnostiID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `svety`
--
ALTER TABLE `svety`
  MODIFY `SvetyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `uzivatele`
--
ALTER TABLE `uzivatele`
  MODIFY `UzivateleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `zivocichove`
--
ALTER TABLE `zivocichove`
  MODIFY `ZivocichoveID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `hracskepostavy`
--
ALTER TABLE `hracskepostavy`
  ADD CONSTRAINT `FK_Hracskepostavy_Kampane` FOREIGN KEY (`KampaneID`) REFERENCES `kampane` (`KampaneID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_Hracskepostavy_Uzivatele` FOREIGN KEY (`UzivateleID`) REFERENCES `uzivatele` (`UzivateleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `kampane`
--
ALTER TABLE `kampane`
  ADD CONSTRAINT `FK_Kampane_Uzivatele` FOREIGN KEY (`UzivateleID`) REFERENCES `uzivatele` (`UzivateleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `kytky`
--
ALTER TABLE `kytky`
  ADD CONSTRAINT `FK_Kytky_Svety` FOREIGN KEY (`SvetyID`) REFERENCES `svety` (`SvetyID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `mapy`
--
ALTER TABLE `mapy`
  ADD CONSTRAINT `FK_Mapy_Svety` FOREIGN KEY (`SvetyID`) REFERENCES `svety` (`SvetyID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `mesta`
--
ALTER TABLE `mesta`
  ADD CONSTRAINT `FK_Mesta_Mapy` FOREIGN KEY (`MapyID`) REFERENCES `mapy` (`MapyID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `npcpostavy`
--
ALTER TABLE `npcpostavy`
  ADD CONSTRAINT `FK_Npcpostavy_Svety` FOREIGN KEY (`SvetyID`) REFERENCES `svety` (`SvetyID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `pravidla`
--
ALTER TABLE `pravidla`
  ADD CONSTRAINT `pravidla_ibfk_1` FOREIGN KEY (`KampaneID`) REFERENCES `kampane` (`KampaneID`);

--
-- Omezení pro tabulku `schopnosti`
--
ALTER TABLE `schopnosti`
  ADD CONSTRAINT `schopnosti_ibfk_1` FOREIGN KEY (`HracskepostavyID`) REFERENCES `hracskepostavy` (`HracskepostavyID`);

--
-- Omezení pro tabulku `svety`
--
ALTER TABLE `svety`
  ADD CONSTRAINT `svety_ibfk_1` FOREIGN KEY (`KampaneID`) REFERENCES `kampane` (`KampaneID`);

--
-- Omezení pro tabulku `zivocichove`
--
ALTER TABLE `zivocichove`
  ADD CONSTRAINT `zivocichove_ibfk_1` FOREIGN KEY (`SvetyID`) REFERENCES `svety` (`SvetyID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
