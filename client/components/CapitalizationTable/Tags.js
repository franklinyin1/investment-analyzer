let cashTags = [
  "CommercialPaperAtCarryingValue",
  "CashFDICInsuredAmount",
  "CashReserveDepositRequiredAndMade",
  "ShorttermDepositsClassifiedAsCashEquivalents",
  "CashEquivalents",
  "CashOnHand",
  "CashAndBankBalancesAtCentralBanks",
  "OtherCashAndCashEquivalents",
  "ShorttermInvestmentsClassifiedAsCashEquivalents",
  "CashAndCashEquivalentsIfDifferentFromStatementOfFinancialPosition",
  "BalancesWithBanks",
  "CashSegregatedUnderOtherRegulations",
  "CashAndSecuritiesSegregatedAndOnDepositForRegulatoryPurposesWithClearingAndDepositoryOrganizations",
  "CashAndSecuritiesSegregatedAndOnDepositForRegulatoryPurposesOrDepositedWithClearingAndDepositoryOrganizations",
  "CashDueFromBanksAndInterestBearingDepositsInBanks",
  "CashAndDueFromBanksIncludingSpecificRestrictedCash",
  "InterestBearingDepositsInBanksIncludingSpecificRestrictedCash",
  "BusinessCombinationRecognizedIdentifiableAssetsAcquiredAndLiabilitiesAssumedCashAcquiredNet",
  "CashAndDueFromBanksExcludingFederalHomeLoanBankCashFairValueDisclosure",
  "CashAndCashEquivalentsIncludedInRestrictedAdvertisingFundAssets",
  "CashAndCashEquivalentsAtTheEndOfThePeriodNetOfOverdraft",
  "CashAndCashEquivalentsBeforeBankOverdrafts",
  "CashAndCashEquivalentsBeforeBankOverdraft",
  "CreditCardCollectionInHand",
  "BalancesWithBanksOnCurrentAccount",
  "BalanceOfCashEquivalentInCentralBanks",
  "CashCashBalancesAtCentralBanksAndOtherDemandDepositsAssets",
  "DueFromFrbInterestBearingCash",
  "TotalCashAndCashEquivalentsAtTheEndOfThePeriod",
  "CashAndDueFromBanksIncludingRestrictedCash",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsContinuingOperations",
  "InterestbearingCashandDuefromBanks",
  "CashCashEquivalentsRestrictedCashandRestrictedCashEquivalentsIncludingAssetsHeldforSale",
  "CashandCashEquivalentsRelatedParties",
  "CashAndCashEquivalentsContinuingOperations",
  "CashAndCashEquivalentsNotHeldAtRelatedParty",
  "CashAndCashEquivalentsHeldAtRelatedParty",
  "InterestBearingDepositsInFederalReserveAndOtherCentralBanks",
  "CashAndCashEquivalentAndRestrictedCashAtBeginningOfPeriod",
  "CashAndCashEquivalentAndRestrictedCashAtEndOfPeriod",
  "CashCashEquivalentsAndMarketableSecurities",
  "TotalCashCashEquivalentsRestrictedCashandRestrictedCashEquivalents",
  "CashAndCashEquivalentsAndCashSegregatedForRegulatoryPurposes",
  "VariableInterestEntityConsolidatedCashAndCashEquivalents",
  "FederalFundsSoldAndOtherInterestBearingDeposits",
  "CashAndCashEquivalentsIncludingSubsidiaryHeldForSale",
  "CashAndCashEquivalentsHeldByVariableInterestEntities",
  "CashandCashDueFromBanks",
  "FederalFundsSoldAndInterestBearingDepositsInBanksAndOtherFinancialInstitutions",
  "CashAndDueFromBanksAndFederalFundsSold",
  "FederalFundsSoldAndOtherCashEquivalents",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsCurrent",
  "VariableInterestEntityCashCashEquivalentsAndRestrictedCash",
  "CashAtFederalReserveAndOtherBanks",
  "CashAndCashEquivalentsExcludingCashHeldByConsolidatedInvestments",
  "InterestBearingDepositsInFinancialInstitutions",
  "CashAndMoneyMarketFunds",
  "CashEquivalentReverseRepurchaseAgreement",
  "CashAndCashEquivalentsIncludingDiscontinuedOperations",
  "Nonsegregatedcashandothernoncashequivalentassetsincludedwithindepositsandreceivablesfrombrokerdealersclearingorganizationsandcounterparties",
  "CashAndCashEquivalentsAtCarryingValueHeldForSale",
  "CashAndCashEquivalentsPerStatementOfCashFlows",
  "CashCashEquivalentsAndRestrictedCashCurrent",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsDisposalGroup",
  "ShortTermInterestBearingDepositsInBanksAndOtherFinancialInstitutions",
  "LongTermInterestBearingDepositsInBanksAndOtherFinancialInstitutions",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsContinuingOperation",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsIncludingAmountsHeldForSale",
  "CashAndAdjustmentsToCashForMarginDepositAssets",
  "CashCashEquivalentsAndRestrictedCashAtEndOfPeriod",
  "CashAndCashEquivalentsAndRestrictedCash",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsOfPredecessor",
  "CashAndCashEquivalentsGeneral",
  "CashAndCashEquivalentsAtCarryingValueExcludingInterestBearingDeposits",
  "CashDenominatedInForeignCurrenciesCostAssets1",
  "CashDenominatedInForeignCurrenciesAssets",
  "CashAndCashEquivalentsvie",
  "CashAndRestrictedCashEndOfYear",
  "InterestBearingDepositsInBanksAndOtherFinancialInstitutionsIncludingFederalFundsSold",
  "CashAtBank",
  "VariableInterestEntityConsolidatedAmountOfCashAndCashEquivalents",
  "CashAndRestrictedCashAtEnd",
  "CashAndCashEquivalentsAndCashAndSecuritiesSegregatedForRegulatoryPurposesEndOfPeriod",
  "NetCashProvidedByAcquisition",
  "CashAndCashEquivalentsHeldByVie",
  "CertificatesOfDepositHeldForInvestment",
  "CashAndCashEquivalentsBeginningOfYearcontinuingOperations",
  "CashAndCashEquivalentsFromTheContinuingOperationsEndOfPeriod",
  "CashAndCashEquivalent",
  "CashCashEquivalentsAndRestrictedCash",
  "LongTermCashEquivalent",
  "TotalCashCashEquivalentsAndRestrictedCashShownInStatementOfCashFlows",
  "TotalCashAndRestrictedCash",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsIncludingDisposalGroupAndDiscontinuedOperation",
  "CASHANDRESTRICTEDCASHAVAILABLEDiscontinuingOperations",
  "CASHANDRESTRICTEDCASHContinuingOperations",
  "TotalCashAndCashEquivalents",
  "CashOverdrafts",
  "CashOverdraftsCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsIncludingDisposalGroupAndDiscontinuedOperations",
  "CashAndCashEquivalentsAsStatedInStatementOfCashFlows",
  "CashAndCashEquivalentsAsStatedInStatementOfFinancialPosition",
  "CashAndDepositsWithFinancialInstitutions",
  "CashAndInterestBearingDepositsWithBanks",
  "CashAndCashEquivalentsCarryingValueAmount",
  "CashAndCashEquivalentsAmount",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalent",
  "CashAndCashEquivalentsAtCarryingValueOne",
  "CashCashEquivalentsAndRestrictedCashEndOfPeriod",
  "DesignatedCashCurrent",
  "CashAndShortTermDeposits",
  "CashAndCashEquivalentsExcludingDisposalGroup",
  "NonInterestBearingCash",
  "CashAndCashEquivalentsAtCarryingValueSuccessor",
];

let debtTags = [
  "NonRecourseDebt",
  "ShortTermBorrowings",
  "ConvertibleSubordinatedDebtNoncurrent",
  "LongTermDebtNoncurrent",
  "DebtCurrent",
  "SubordinatedLongTermDebt",
  "DebtLongtermAndShorttermCombinedAmount",
  "OtherLongTermDebtNoncurrent",
  "JuniorSubordinatedDebentureOwedToUnconsolidatedSubsidiaryTrustNoncurrent",
  "ConvertibleSubordinatedDebt",
  "CurrentPortionOfDebt",
  "SubordinatedDebtCurrent",
  "LongTermDebtAndCapitalLeaseObligations",
  "MediumtermNotesNoncurrent",
  "UnsecuredDebtCurrent",
  "SubordinatedDebt",
  "SecuredLongTermDebt",
  "DebtInstrumentFaceAmount",
  "LongTermDebtAndCapitalLeaseObligationsIncludingCurrentMaturities",
  "SecuredDebt",
  "JuniorSubordinatedNotes",
  "OtherLongTermDebtCurrent",
  "LongTermDebtAndCapitalLeaseObligationsCurrent",
  "ContractualObligation",
  "ConvertibleSubordinatedDebtCurrent",
  "UnsecuredLongTermDebt",
  "ConvertibleDebtNoncurrent",
  "LongTermDebtCurrent",
  "LongTermDebt",
  "SecuredDebtCurrent",
  "ConvertibleLongTermNotesPayable",
  "UnsecuredDebt",
  "JuniorSubordinatedDebentureOwedToUnconsolidatedSubsidiaryTrust",
  "LongTermDebtFairValue",
  "ConvertibleDebtCurrent",
  "JuniorSubordinatedLongTermNotes",
  "SecuredDebtOther",
  "ConvertibleNotesPayableCurrent",
  "MediumTermNotes",
  "SeniorNotesCurrent",
  "ShorttermDebtFairValue",
  "SecuredDebtRepurchaseAgreements",
  "DebtAndCapitalLeaseObligations",
  "OtherLongTermDebt",
  "DebtInstrumentConvertibleCarryingAmountOfTheEquityComponent",
  "DebtorInPossessionFinancingBorrowingsOutstanding",
  "ConvertibleDebt",
  "MediumtermNotesCurrent",
  "CurrentDebtInstrumentsIssued",
  "DebtSecurities",
  "NoncurrentDebtInstrumentsIssued",
  "BusinessCombinationRecognizedIdentifiableAssetsAcquiredAndLiabilitiesAssumedCurrentLiabilitiesLongTermDebt",
  "DebtInstrumentUnamortizedPremium",
  "FinancialInstrumentsSoldNotYetPurchasedUSGovernmentAndAgencyObligations",
  "FinancialLiabilitiesFairValueDisclosure",
  "FairValueLiabilitiesMeasuredOnRecurringBasisSubordinatedDebtObligations",
  "JuniorSubordinatedNotesCurrent",
  "LongtermPollutionControlBondCurrentAndNoncurrent",
  "LongTermPollutionControlBond",
  "ConvertibleNotesPayableRelatedPartiesCurrent",
  "ConvertiblePromissoryNoteNetOfDebtDiscount",
  "LineOfCreditRelatedPartiesCurrent",
  "LongTermDebtAndFinanceLeaseObligationsCurrent",
  "AllOtherLiabilities",
  "LongTermDebtAtFairValueUnderFairValueOption",
  "DueToTrustAccountAndOtherShortTermDebtAtFairValue",
  "DueToTrustAccountAndShortTermBorrowing",
  "PayCheckProtectionProgrammeLongTermDebtNonCurrents",
  "DebtNonCurrent",
  "ShortTermDebtLongTermDebtCurrentMaturitiesAndFinanceLeaseLiabilityCurrent",
  "SharesettledDebtObligationRelatedPartyNetOfDebtDiscountNonCurrent",
  "SubordinatedRelatedPartyDebtCurrent",
  "SeniorSecuritiesIssued",
  "NotesPayableRelatedParty",
  "LongTermDebtOtherThanCreditFacilityLessCurrentMaturities",
  "DebtSecuritiesIssuedAtFairValueThroughProfitOrLossDesignatedAsUponInitialRecognition",
  "OtherDebtNoncurrent",
  "LongTermDebtAndMandatorilyRedeemableSecurities",
  "LongTermDebtAndCapitalLeaseObligationsAndDeemedLandlordFinancingLiabilitiesNoncurrent",
  "LongTermDebtAndCapitalLeaseObligationsAndDeemedLandlordFinancingLiabilitiesCurrent",
  "LinesOfCreditShortTermDebtAndCurrentPortionOfLongTermDebt",
  "NotesPayableExcludingConvertibleNotesPayableCurrent",
  "AffiliatedLongTermDebtNoncurrent",
  "IndebtednessAssociatedWithRealEstateHeldForSaleNet",
  "SubordinatedLongTermDebtNetOfDebtIssuanceCosts",
  "LongTermDebtExcludingIndebtednessAssociatedWithRealEstateHeldForSale",
  "SeniorNotesNetOfDebtIssuanceCosts",
  "LongtermDebtFinanceLeaseandOtherFinancingObligationsCurrent",
  "LongTermDebtAndFinanceLeasesCurrent",
  "DebtandCapitalLeaseObligationsnetofdeferredfinancingcosts",
  "RecourseAndNonRecourseDebtAndCapitalLeaseObligations",
  "LongTermDebtAndFinanceLeasesNoncurrent",
  "LongTermDebtExcludingCurrentMaturitiesAndNotesPayable",
  "LongTermDebtNetOfCurrentMaturitiesAndDebtDiscount",
  "ShortTermBorrowingsAndLongTermDebtCurrent",
  "LongTermDebtExcludingSeniorNotesHeldBySpecialPurposeEntity",
  "AssetSpecificDebtAgreementsNet",
  "SecuritizedDebtObligationsNet",
  "ProjectDebtNoncurrent",
  "LongtermDebtRightOfUseFinancingObligationsExcludingCurrentMaturities",
  "DebtSecuritiesAtAmortisedCost",
  "DebtSeriesBPreferredStock",
  "LongTermDebtCurrentNet",
  "ProjectDebtCurrent",
  "LongTermDebtAndFinanceLeaseLiabilitiesNonCurrent",
  "UnsecuredIndebtedness",
  "STBorrowingsCurrentPortionofLTDebtAndCurrentPortionOfOtherLTLiabilities",
  "LongTermDebtNetOfDeferredFinancingCostsNonCurrent",
  "CurrentMaturitiesOfLongTermDebtAndFinanceLeaseLiabilities",
  "LongTermDebtCurrentAndShortTermDebt",
  "DebtorInPossessionFinancingTermLoan",
  "LongtermDebtExcludingCurrentMaturitiesNet",
  "LongTermDebtsCurrentExcludingRevolvingCreditFacility",
  "CurrentMaturitiesOfNonRecourseLongTermDebt",
  "LongTermDebtNet",
  "LongTermDebtCurrentMaturitiesLeaseObligationCurrentAndOtherFinancingCurrent",
  "CurrentPortionOfLongTermDebtAndFinanceLeaseLiabilities",
  "LongtermDebtCurrentMaturitiesExcludingNotesandBonds",
  "LineOfCreditNet",
  "LongTermDebtIncludingMembersSubordinatedCertificates",
  "DebtExcludingSecuredDebt",
  "Trustpreferredsecurities",
  "LongTermDebtExcludingLinesOfCreditCurrent",
  "ShortTermBorrowingsAndNotesPayableToBankCurrent",
  "LongTermDebtCurrentIncludingDebtIssuanceCosts",
  "QualifyingDebt",
  "RecourseDebt",
  "LongTermDebtnetofIssuanceCosts",
  "ShortTermDebtAndLongTermDebtCurrentMaturities",
  "LongTermDebtOfConsolidatedInvestmentProducts",
  "DebtCertificatesAtFairValue",
  "DebtCertificatesAtAmortizedCost",
  "SecuredDebtRepurchaseAgreementsAndWarehouseAgreementBorrowings",
  "LongTermDebtCurrentMaturitiesExcludingCurrentNotesPayable",
  "ExternalCurrentDebt",
  "DebtandDepositLiabilities",
  "LongTermDebtFairValueOptionDisclosure",
  "LongTermDebtIncludesRedeemablePreferredStockAtRedemptionValue",
  "SeniorNotesAndOtherDebt",
  "LongTermFinancialDebtNoncurrent",
  "ShortTermFinancialDebtCurrent",
  "LiabilitiesOtherThanLongTermDebtRelatedToCapitalizationNoncurrent",
  "LongtermDebtExcludingCurrentMaturitiesAndRelatedParties",
  "CurrentProjectDebt",
  "NoncurrentPortionOfNoncurrentProjectDebt",
  "LongTermDebtAndFinanceLeaseCurrentMaturities",
  "LongTermDebtAndFinanceLeaseLiabilityCurrentMaturities",
  "LongTermDebtAndFinanceLeaseLiabilityExcludingCurrentMaturities",
  "AffiliateCurrentDebt",
  "LongTermDebtCurrent1",
  "LongTermBorrowings",
  "LongTermDebtNonCurrentIncludingAccretion",
  "ConvertibleDebtRelatedPartyNetOfDiscount",
  "LongTermDebtExcludingLineOfCreditNoncurrent",
  "ShortTermDebtAssumed",
  "LongTermDebtAssumed",
  "NotesPayableAndCurrentMaturitiesOfLongTermDebt",
  "SecuredLongTermDebtSecuritizationProgramCurrent",
  "SecuredLongTermDebtSecuritizationProgramNoncurrent",
  "LongTermDebtAndFinanceLeaseObligations",
  "SecuredAndUnsecuredDebtObligations",
  "LongtermDebtGrossAndFinanceLeasesNoncurrent",
  "RecourseLongTermDebtNoncurrent",
  "LongTermDebtAndFinanceLeaseObligationsNoncurrent",
  "NonRecourseLongTermDebtNoncurrent",
  "VariableInterestEntityCollateralizedLoanObligationSecuritiesLongTermDebt",
  "RecourseLongTermDebtCurrent",
  "ShortTermDebtAndMaturitiesOfLongTermDebtCurrent",
  "NonRecourseLongTermDebtCurrent",
  "LongTermDebtandCapitalLeaseObligationsExcludingCurrentPortionNet",
  "LongTermObligationsCurrent",
  "LongTermObligationsNoncurrent",
  "SecuritizedDebtLoansHeldForInvestmentAtFairValue",
  "LongtermDebtandCapitalLeaseObligationsCurrentNet",
  "SecuritizedDebtNonAgencyResidentialMortgageBackedSecurities",
  "ReceivableBackedNotesPayable",
  "LongtermDebtandFinanceLeaseObligationCurrent",
  "ReceivableBackedNotesPayableNonRecourse",
  "DebtCurrentExcludingOperatingLeaseLiabilityCurrent",
  "LongTermDebtCurrentAndAccruedInterest",
  "LongtermLineofCreditNoncurrentNetofDebtIssuanceCosts",
  "LongtermDebtandFinanceLeaseLessCurrentMaturities",
  "ConvertibleDebtEquity",
  "ShorttermDebt",
  "CapitalLeaseLongTermPortion",
  "CapitableLeaseCurrentPortion",
  "DebtAndFinanceLeaseObligationsNet",
  "SecuredDebtAndFinanceLeaseObligations",
  "DebtDueToAvisBudgetRentalCarFundingAesopLlcRelatedParty",
  "Debt",
  "NonRecourseDebtCurrent",
  "RecourseDebtNonCurrent",
  "DebtAndLeaseLiabilityCurrent",
  "LongTermDebtAndCapitalLeaseObligationsLessCurrentMaturities",
  "NonRecourseDebtNonCurrent",
  "AcquisitionDebtNetofCurrentPortion",
  "LongTermDebtExcludingSeniorNotesSubordinatedNotesAndJuniorSubordinated",
  "NonRecourseDebtDue2035Noncurrent",
  "NonRecourseDebtDue2035Current",
  "FilmObligationsNoncurrent",
  "EquipmentFinancingDebtNonCurrent",
  "FilmObligationsCurrent",
  "CurrentPortionOfLongTermDebtWithFullRecourse",
  "DebtInstrumentCarryingAmountNonCurrent",
  "DebtFinancingLiabilitiesNet",
  "LongtermDebtExcludingSubordinatingDebt",
  "LongTermDebtNoncurrentExcludingRelatedPartyDebt",
  "IndustrialRevenueBonds",
  "LongTermDebtAndFairValueHedges",
  "NoncurrentPortionOfNonRecourseDebt",
  "DebtCurrentNetOfIssuanceCost",
  "ShortTermDebttoAffiliates",
  "DebtDomestic",
  "DebtForeign",
  "LongTermDebtToAffiliates",
  "LongTermDebtFairValueExcludingCurrentMaturities",
  "OtherLongtermDebtGrossNoncurrent",
  "LongTermDebtNoncurrentNet",
  "ShorttermBorrowingsExcludingSecuritiesSoldUnderAgreementsToRepurchase",
  "CurrentDebtExcludingFinanceLeaseLiability",
  "LiabilityforContingentMilestonePaymentNoncurrent",
  "RealEstateDebtNet",
  "LongTermDebtAndOtherDebtNetNoncurrent",
  "LongTermDebtExcludingCurrentMaturitiesAndCapitalLeaseObligations",
  "LongTermDebtCurrentMaturitiesRelatedParty",
  "LongTermDebtNetOfHedgingAdjustments",
  "TransitionAndSystemRestorationBondsLongTermDebtCurrent",
  "LongTermDebtAndOtherDebtNetCurrent",
  "TransitionAndSystemRestorationBondsLongTermDebtNonCurrent",
  "LongTermDebtNonCurrentExcludingConvertibleNotes",
  "IndexedDebtCurrent",
  "LongTermDebtExcludingSubordinatedDebtNoncurrent",
  "LongTermDebtCurrentExcludingNotesPayable",
  "InterestPayableNoncurrent",
  "LongTermDebtCurrentMaturitiesExcludingNotesPayable",
  "DebtCurrentExcludingOperatingLeaseObligations",
  "LongTermDebtExcludingJuniorSubordinatedDebentureOwedToUnconsolidatedSubsidiaryTrust",
  "LongTermDebtAndFinanceLeaseObligationsExcludingLineOfCredit",
  "DebtAndCapitalLeaseObligations1",
  "LongTermDebtExcludingJuniorSubordinatedDebentureOwedToUnconsolidatedSubsidiaryTrustAndSubordinatedDebt",
  "LongTermDebtAndCapitalLeaseObligationsExcludingLongTermLineOfCredit",
  "BankNotesAndSeniorDebt",
  "ConvertibleLongTermNotesPayableNoncurrent",
  "SecuredDebtNet",
  "LongTermDebtExcludingJuniorSubordinatedNotes",
  "AffiliatedLongTermDebt",
  "LongtermPortionofRecourseDebtExcludingRelatedPartyExcludingCurrentMaturities",
  "LongtermPortionofNonRecourseDebtExcludingRelatedPartyExcludingCurrentMaturities",
  "LongTermDebtExcludingSecuredDebtAndLineOfCredit",
  "ShortTermDebtIncludingCapitalLeaseObligations",
  "LongtermPortionofNonRecourseDebtExcludingRelatedPartyCurrentMaturities",
  "LoansPayableCurrentNotIncludedInCurrentPortionOfLongTermDebt",
  "LongTermDebtIncludingCapitalLease",
  "LongtermPortionofRecourseDebtExcludingRelatedPartyCurrentMaturities",
  "SecuredDebtFairValue",
  "NonRecourseDebtNet",
  "LongTermDebtOtherThanSubordinatedDebt",
  "DebtLongTermAndShortTermCombinedAmountExcludingSubordinatedDebt",
  "SubordinatedDebentures",
  "SeniorUnsecuredNotes",
  "ConvertibleDebtLineOfCreditAndOtherNotesPayable",
  "PayableForInvestmentSecuritiesPurchased",
  "ShortTermDebtAffiliates",
  "LongtermDebtCurrentMaturitiesExcludingLineOfCredit",
  "SecuritizedDebtOfConsolidatedVie",
  "LongTermDebtAndLeaseObligationExcludingLineOfCredit",
  "LongTermDebtOtherThanJuniorSubordinatedNotes",
  "SubordinatedDebtNetOfIssuanceCosts",
  "LongTermDebtAndEquipmentFinancingFacilitiesAndCapitalLeaseObligationsCurrent",
  "CapitalLeaseandOtherObligationsNoncurrent",
  "ShortTermBorrowingsAndOtherInterestBearingLiabilities",
  "SubordinatedDebtAndJuniorSubordinatedDebt",
  "CustomerReceivableCreditFacilityExcludingCurrentMaturities",
  "CustomerReceivableCreditFacilityCurrentMaturities",
  "LongTermDebtCurrentMaturitiesRelatedParties",
  "LongTermDebtExcludingCurrentMaturitiesRelatedParties",
  "LongTermDebtCurrentCurrentPortion",
  "LongTermDebtCurrentMaturitiesExcludingRelatedParties",
  "DebtAndLeaseObligations",
  "LongTermDebtOtherThanLongTermCommercialPaperNoncurrent",
  "LongtermDebtandCapitalLeaseObligationsnet",
  "DebtForForwardSharePurchaseAgreementsCurrent",
  "ConvertibleLongTermNotePayable",
  "DebtorInPossessionFinancingLineOfCredit",
  "SubordinatedDebtGross",
  "SubordinatedDebtNetOfUnamortizedDebtIssuanceCosts",
  "DueToRelatedPartiesConvertibleNotesCurrent",
  "LongTermDebtCurrentFairValue",
  "RelatedPartyDebtNetFairValue",
  "ShorttermDebtRelatedParty",
  "ConvertibleDebtNonCurrentRelatedParty",
  "ConvertibleDebtCurrentRelatedParty",
  "JuniorSubordinatedNotesNet",
  "LongTermNonRevolvingDebtNet",
  "LongTermDebtAndFinanceLeaseObligationsNetOfCurrentPortion",
  "LongtermDebtandLongtermDebtHeldinEscrowCurrentMaturities",
  "LongTermDebtNonCurrentOtherThanNotes",
  "LongTermDebtCurrentOtherThanNotesAndAdvances",
  "LongTermDebtRelatedPartyNonCurrent",
  "BuiltToSuitObligationNetofDebtDiscountLongtermPortion",
  "LongTermDebtExcludingLongTermLineOfCreditAndCurrentMaturities",
  "BondPayable",
  "LongTermsDebtNoncurrent",
  "LongTermDebtCurrentMaturitiesExcludeNotesPayableCurrent",
  "LongtermDebtCurrentMaturitiesExcludingLineOfCreditCurrent",
  "ConvertibleLoanCurrent",
  "LongTermDebtAndRightOfUseLeaseLiabilities",
  "LongTermDebtLessCurrentPortion",
  "LongTermDebtLiability",
  "LongTermDebtsNoncurrent",
  "SecuredDebtNetofDeferredFinancingCosts",
  "LongTermDebtNoncurrentandFinanceLeaseLiabilities",
  "LongTermDebtCurrentandFinanceLeaseLiabilities",
  "RelatedPartyDebtCurrent",
  "MortgageLevelDebt",
  "LoansNetOfUnamortizedDebtDiscountLongTerm",
  "LoansNetOfUnamortizedDebtDiscount",
  "BorrowingsTotal",
  "LongTermDebtExcludingLongTermLineOfCreditNoncurrent",
  "NotesPayableAssociatedWithStructuredFinancingsFairValue",
  "DebtorInPossessionBorrowingsOutstandingCurrent",
  "LongTermDebtExcludingPaycheckProtectionProgramLoans",
  "LongTermDebtCurrentPrincipalAmount",
  "LongTermDebtNonCurrentPrincipalAmount",
  "NotesPayableCurrentExcludesConvertibleNotesPayable",
  "SecuredDebtIncludingDisposalGroup",
  "OtherIndebtednessNoncurrent",
  "OtherIndebtednessCurrent",
  "DisposalGroupIncludingDiscontinuedOperationSecuredDebt",
  "LongTermDebtNetOfCurrentPortionAndDebtDiscount",
  "ConvertibleNotesPayableCurrentPortionNetOfDebtDiscount",
  "ConvertibleDebtAndDerivativeLiability",
  "LongTermDebtExcludingConvertibleDebtNoncurrent",
  "LongtermDebtNetCreditFacility",
  "OtherDebt",
  "ConvertibleShorttermDebt",
  "ConstructionLoansRelatedParties",
  "RelatedPartiesDebtInstrumentUnamortizedDiscount",
  "LongTermDebtAndLeaseObligationOtherThanConvertibleNotes",
  "ConvertibleNotePayableAndAccruedInterestNetOfDebtDiscountRelatedPartyNonCurrent",
  "DebtRelatedPartiesNet",
  "LongtermDebtNetOfCurrentPortion",
  "NonconvertibleNotesPayableCurrent",
  "ConvertibleNotesPayableRelatedPartyCurrent",
  "LongTermDebtFromBankingInstitutions",
  "ConvertibleNotesPayableRelatedPartyNetOfDebtDiscount",
  "LongtermDebtNetOfCurrentMaturitiesAndLoanCosts",
  "DebtCurrentExcludeLoansPayable",
  "ShorttermDebtPaycheckProtectionProgram",
  "ShorttermDebtsOther",
  "ConvertibleLongTermNotesPayableRelatedParty",
  "ConvertibleNotesPayableNetCurrent",
  "DebtRelatedToVesselsHeldForSaleCurrent",
  "PaycheckProtectionProgramCaresActNotesPayableCurrent",
  "DebtCurrentExcludingNotesPayable",
  "ConvertibleNotesPayableNetOfDiscount",
  "TenPercentSecuredConvertibleNotesPayableCurrent",
  "FourPercentSecuredConvertibleNotesPayableCurrent",
  "LongTermDebtSecuredNoncurrent",
  "SecuredNotesExcludingMortgageDebt",
  "ConvertibleDebtCurrentFairValueDisclosures",
  "LongTermDebtExcludingUnsecuredDebt",
  "VentureDebtNetOfDiscount",
  "VentureDebtNetOfDiscountNonCurrent",
  "LongTermDebtAndCapitalLeaseObligationCurrent",
  "ConvertibleNotePayableCurrent",
  "LongTermDebtAndNotesPayableCurrent",
  "RelatedPartyLongTermDebtCurrent",
  "ShorttermCreditAndCurrentMaturitiesOfLongtermDebt",
  "CurrentPortionOfLongtermDebt",
  "LongTermDebtAndFinanceLeaseLiabilityCurrent",
  "DebtCurrentLiability",
  "LongTermDebtAndFinanceLeaseLiabilityNoncurrent",
  "LongtermDebtCurrentMaturitiesNetofDebtIssuanceCosts",
  "PrivatePlacementConvertibleDebtRelatedPartyNetOfCosts",
  "ConvertibleDebtRelatedPartyCurrent",
  "LongTermConvertibleNotesPayableCurrent",
  "LongTermDebtCurrentMaturitiesExcludingRelatedPartyDebt",
  "LongTermDebtRelatedPartyCurrentMaturities",
  "DebtLongTerm",
  "ShortTermBorrowingsIncludingLongTermDebtCurrentAndShortTermSecuritizationBorrowings",
  "PropertyMortgageLoansNetOfDebtIssuanceCosts",
  "DebtAndLeaseObligationNonCurrent",
  "LongTermDebtExcludingCurrentMaturitiesNetOfFairValueAdjustment",
  "LinesOfCreditNetOfDeferredIssuanceCostCurrent",
  "ShortTermDebtAndCurrentPortionOfLongTermDebt",
  "ConvertibleDebtRelatedPartiesClassifiedCurrent",
  "LongTermDebtRelatedPartiesCurrentMaturities",
  "RelatedPartyDebtNonCurrent",
  "SecuredLongTermDebts",
  "DebtExcludingLineOfCreditCurrent",
  "LongtermDebtCurrentMaturitiesExcludingNorthAmericanRevolvingLine",
  "ShortTermBorrowingsAndInterestRateSwap",
  "ContingentAcquisitionDebtLessCurrentPortion",
  "ConvertiblePromissoryNoteRelatedParty",
  "LongTermDebtAndFinanceLeaseCurrent",
  "LongTermDebtAndFinanceLease",
  "DueToRelatedPartiesCurrentExcludingAccountsPayable",
  "CurrentPortionOfEquipmentFinancingDebt",
  "EquipmentFinancingDebtNetOfCurrentPortion",
  "ConvertibleNotesAndAccruedInterestNetOfDebtDiscount",
  "ConvertibleNotesPayableNetOfDiscounts",
  "LongTermDebtConsolidatedVariableInterestEntitiesWithoutRecourse",
  "ShareholderDebtDueToIssuanceOfShares",
  "LongTermDebtExcludingNotesPayableCurrent",
  "SeniorConvertibleNotesPayableCurrent",
  "ConvertibleDebenture",
];

let NCITags = [
  "BusinessCombinationAcquisitionOfLessThan100PercentNoncontrollingInterestFairValue",
  "RedeemableNoncontrollingInterestEquityRedemptionValue",
  "RedeemableNoncontrollingInterestEquityCommonFairValue",
  "RedeemableNoncontrollingInterestEquityOtherRedemptionValue",
  "RedeemableNoncontrollingInterestEquityPreferredFairValue",
  "MinorityInterestInRealEstateFunds",
  "LimitedPartnersInterestInOperatingPartnershipNoncontrollingInterest",
  "MinorityInterestEquityDeficitInJointVentures",
  "NoncontrollingInterestsPartiallyOwnedProperties",
  "RestNonControllingInterest",
  "ValuationAdjustmentsMinorityInterest",
  "NonControllingInterestExcludingAccumulatedOtherComprehensiveIncome",
  "MandatorilyRedeemableNoncontrollingInterests",
  "NoncontrollingInterestMezzanineEquity",
  "StockholdersEquityAttributableToNoncontrollingInterestExcludingPortionAttributableToNoncontrollingInterestOfWhollyOwnedIndirectSubsidiaryOfRegistrant",
  "NoncontrollingInterestInLimitedPartnerships1",
  "MinorityInterestGross",
  "NoncontrollingInterestInJointVenturesAndSubsidiaryMembershipUnits",
  "RedeemableNoncontrollingInterest",
  "NoncontrollinginterestClassAsharesofBrookfieldInfrastructureCorporationequity",
  "NoncontrollinginterestExchangeLPunitsequity",
  "RedeemableNoncontrollingInterestRelatedPartyCarryingAmount",
  "StockholdersEquityAttributabletoNoncontrollingInterestThirdParty",
  "StockholdersEquityAttributableToNoncontrollingInterestExcludingPreferredStock",
  "StockholdersEquityAttributabletoNoncontrollingInterestRelatedParty",
  "RedeemableNoncontrollingInterestEquity",
  "StockholdersEquityAttributableToNoncontrollingInterestPreferredSharesIssuedBySubsidiary",
  "RedeemableNoncontrollingInterestEquityPreferredCarryingAmountCurrent",
  "RedeemableNoncontrollingInterestEquityDeficitCommonCarryingAmount",
  "NoncontrollingInterestInSubsidiary",
  "RedeemableNonControllingInterestsNoncurrent",
  "RedeemableNonControllingInterestsCurrent",
  "NoncontrollingInterestInConsolidatedSubsidiary",
  "MinorityInterestAmount",
  "NoncontrollingsInterest",
  "TransactionReserveWithNonControllingInterest",
];

let preferredEquityTags = [
  "PreferredStockIncludingAdditionalPaidInCapitalNetOfDiscount",
  "PreferredUnitsContributedCapital",
  "PreferredStockLiquidationPreferenceValue",
  "PreferredStockValue",
  "PreferredUnitsPreferredPartnersCapitalAccounts",
  "PreferredStockRedemptionAmount",
  "AuctionMarketPreferredSecuritiesStockSeriesLiquidationValue",
  "PreferredStockValueOutstanding",
  "PreferredStockIncludingAdditionalPaidInCapital",
  "ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue",
  "AdditionalPaidInCapitalPreferredStock",
  "TemporaryEquityLiquidationPreference",
  "LimitedLiabilityCompanyLLCPreferredUnitIssuanceValue",
  "PreferredStockSharesSubscribedButUnissuedValue",
  "PreferredStockRedemptionAmountFutureRedeemableSecurities",
  "PreferredStockValue1",
  "MandatorilyRedeemableConvertiblePreferredShares",
  "ConvertiblePreferedStock",
  "RedeemableConvertiblePreferredStockWarrantLiabilityNonCurrent",
  "RedeemableConvertiblePreferredStockWarrantLiability",
  "PreferredStockValueSeriesB",
  "PreferredStockValue3",
  "PreferredStockValueSeriesD",
  "PreferredStockValue2",
  "PreferredStockValueSeriesC",
  "RedeemableConvertiblePreferredStockRedemptionValue",
  "PreferredStockValueSeriesA",
  "ReceivableFromShareholdersForIssuanceOfConvertibleRedeemablePreferredShares",
  "RedeemablePreferredSecuritiesofSubsidiaries",
  "PreferenceUnitHolders",
  "TrustPreferredSecurities",
  "RedeemableConvertiblePreferredStockValue",
  "DebtSeriesBPreferredStock",
  "SeniorPreferredStock",
  "MandatorilyRedeemablePreferredStockNonCurrent",
  "MandatorilyRedeemablePreferredStockCurrent",
  "CumulativePreferredStockOfSubsidiaryWithoutMandatoryRedemptionRequirements",
  "PreferredStockRedeemableandNonRedeemableValue",
  "PreferredStockConvertibleValue",
  "PreferredStockCarryingValue",
  "SeniorPreferredStockValue",
  "SeniorPreferredStockLiquidationPreferenceValue",
  "PreferredStockLiability",
  "PreferredStockRedemptionOneAmount",
  "TotalPreferredStockValue",
  "PreferredStockRedeemableValue",
  "ConvertiblePreferredStock",
  "PreferredStockCurrent",
  "CumulativePreferredStockOfSubsidiary",
  "PreferenceShares",
  "TemporaryEquityRedeemablePreferredUnitsRedemptionValue",
  "PreferredStockCLiquidationPreferenceValue",
  "PreferredStockDLiquidationPreferenceValue",
  "PreferredStockValueExcludingTreasuryStock",
  "PreferredStockandAdditionalPaidinCapitalValueIssued",
  "PrivatePerpetualPreferredUnitsIssuedValue",
  "RedeemablePreferredStockRedemptionAmount",
  "CurrentPortionOfPreferredSharesNet",
  "SeriesAPreferredStockValue",
  "PreferredStockValueOne",
  "PreferredStockValueTwo",
  "RedeemablePreferredEquity",
  "MandatorilyRedeemablePreferredShares",
  "PreferredStockRedemptionValue",
  "SeriesYPreferredStockValueIssued",
  "NonConvertiblePreferredStockLiabilities",
  "PreferredUnitholdersCapitalAccount",
  "RedeemablePreferredStockValueCurrent",
  "ConvertiblePreferredStockSerieTwo",
  "ConvertiblePreferredStockSeries",
  "RedeemableConvertiblePreferredStockTrancheObligation",
  "ConvertiblePreferredStockValue",
  "RedeemablePreferredStockSeriesC",
  "RedeemablePreferredStockSeriesA",
  "MandatorilyRedeemablePreferredStock",
  "ExchangablePreferredStock",
  "PreferredStocksValue",
  "PreferredStockValueasof",
  "PreferredEquityCertificatesNoncurrent",
  "SeriesBPreferredStockParValue",
  "PreferredStockSeriesFValue",
  "PreferredStockSeriesDValue",
  "PreferredStockSeriesAValue",
  "PreferredStockSeriesBValue",
  "PreferredStockSeriesEValue",
  "PreferredStockSeriesCValue",
  "SeriesCPreferredStockValue",
  "RedeemablePreferredStock",
  "PreferredStockValue4",
  "PreferredStockValue5",
  "ConvertiblePreferredStockPayable",
  "ConvertiblePreferredStockValue1",
  "RedeemableConvertiblePreferredStock",
  "PreferredUnitsAggregateLiquidationPreferenceValue",
  "ContingentlyRedeemableSeriesEPreferredStock",
  "PreferredStockEngineeredProductsAcquisitionLimitedSharesIssuedAndOutstanding1",
  "PreferredStockSeriesAUepHoldingsLlcUnitsIssuedAndOutstanding",
  "PreferredStockSeriesBUepHoldingsLlcUnitsIssuedAndOutstanding",
  "SeriesDPreferredStock",
  "PreferredStockG",
  "PreferredStockSeriesCParValueOf0012000000SharesAuthorizedAsOfDecember3120151107607AndZeroSharesIssuedAndOutstandingAsOfDecember312015AndJune302015Respectively",
  "PreferredStockSeriesBParValueOf0019000000SharesAuthorizedAsOfDecember312015June302015And20140SharesOutstandingAsOfDecember312015June302015And2014",
  "MezzaninePreferredStockValue",
  "PreferredStockE",
  "PreferredStockF",
  "PreferredStockStatedValue",
  "PreferredStockSeriesB",
  "PreferredStockSeriesE0.00001ParValue.12SharesAuthorized12AndZeroSharesIssuedAndOutstandingAsOfDecember312019And2018Respectively",
  "PreferredStockSeriesD0.00001ParValue.1ShareAuthorized1AndZeroSharesIssuedAndOutstandingAsOfDecember312018And2017Respectively1",
  "ShareCapitalPreferred",
  "SeriesSeedTwoPreferredStock",
  "PreferredUnitIssuanceValue",
  "FFPreferredCommonStock",
  "SeriesSeedOnePreferredStock",
  "SeriesSeedPreferredStock",
  "SeriesAPreferredStock",
  "SeriesAOnePreferredStock",
  "ConvertiblePreferredStockValueIssued",
  "SeriesGPreferredStock",
  "RedeemablePreferredStockOfSubsidiaries",
  "RedeemablePreferredStockHeldByRelatedPartyNonCurrent",
  "AdditionalPaidInCapitalPreferredStockSeriesE",
  "TemporaryEquityPreferenceSharesAmount",
  "AdditionalPaidInCapitalPreferredStockSeriesD",
  "SeriesBPreferedStock",
  "SeriesCPreferedStock",
  "SeriesAPreferedStock",
  "SeriesDPreferedStock",
  "ConvertiblePreferredShares",
];

export default { cashTags, debtTags, NCITags, preferredEquityTags };

