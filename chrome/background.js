var luminateEdit = {
  tabUrl: null,
  getCurrentServlet: function () {
    return null == luminateEdit.tabUrl ||
      (-1 == luminateEdit.tabUrl.indexOf("/site/") &&
        -1 == luminateEdit.tabUrl.indexOf("/images/content/pagebuilder/"))
      ? null
      : -1 != luminateEdit.tabUrl.indexOf("/images/content/pagebuilder/")
      ? "ImageLibraryPseudoServlet"
      : luminateEdit.tabUrl
          .split("/site/")[1]
          .split("/")[0]
          .split("?")[0]
          .split(";")[0];
  },
  getQueryParam: function (e) {
    if (null == luminateEdit.tabUrl || -1 == luminateEdit.tabUrl.indexOf("?"))
      return null;
    var t =
      "&" +
      luminateEdit.tabUrl.split("?")[1].replace(new RegExp("&amp;", "g"), "&");
    return -1 == t.indexOf("&" + e + "=")
      ? null
      : t.split("&" + e + "=")[1].split("&")[0];
  },
  common: {
    api: {
      getUrl: function () {
        return "SiteData?sdp=open_home";
      },
    },
  },
  servlets: {
        Advocacy: {
      getUrl: function () {
        var e = "AdvocacyAdmin",
          t = luminateEdit.getQueryParam("page"),
          a = luminateEdit.getQueryParam("pg"),
          r = luminateEdit.getQueryParam("rid"),
          i = luminateEdit.getQueryParam("id");
        null != luminateEdit.getQueryParam("alertId") &&
          (i = luminateEdit.getQueryParam("alertId"));
        var n = function (e, t, a) {
          return (
            "?advocacy=" +
            (a = a || "alertPageConfigPage.edit_alert_config_pages") +
            "&advocacyPageType=" +
            e +
            "&alert_id=${alertId}" +
            (t || "")
          );
        };
        switch (t) {
          case "UserAction":
            e +=
              null != r
                ? "?cmd=display&page=AdminActionPage&id=${alertId}"
                : n(
                    "takeActionBeanPage",
                    "&isBeanPage=true",
                    "alertBeanPageEditor.edit_alert_config_pages"
                  );
            break;
          case "RepSelect":
            e += n("confirmAction");
            break;
          case "UserPrint":
            e += n("printLetters");
            break;
          case "OnScreenThanks":
            e += n("displayThankYou");
            break;
          case "TafThanks":
            e += n("tellAFriendThanks");
            break;
          case "NoRecipients":
            e += n("noRecipients");
            break;
          case "UserActionInactive":
            e += n("noLongerActive");
        }
        switch (a) {
          case "makeACall":
            e += "?advocacy=makeACallPageBannerEdit&alertId=${alertId}";
            break;
          case "logACall":
            e += "?advocacy=logACallPageBannerEdit&alertId=${alertId}";
        }
        return (e = e.replace("${alertId}", i));
      },
    },
    AjaxProxy: {
      getUrl: function () {
        return "SiteData?sdp=open_ajax_proxy";
      },
    },
    Calendar: {
      getUrl: function () {
        var e = "OrgEventEdit",
          t = luminateEdit.getQueryParam("view"),
          a = luminateEdit.getQueryParam("id");
        switch (t) {
          case "Detail":
            e += "?orgevent.edit=additional_event_info&event_id=${eventId}";
            break;
          default:
            null != a &&
              (e +=
                "?orgevent.edit=edit_event_information&event_id=${eventId}");
        }
        return (e = e.replace("${eventId}", a));
      },
    },
    Clubs: {
      getUrl: function () {
        var e = "ClubsAdmin",
          t = luminateEdit.getQueryParam("club_id");
        return (
          null != t && (e += "?edit=true&club_id=${clubId}&pg=aedit"),
          (e = e.replace("${clubId}", t))
        );
      },
    },
    ConsInterestsUser: {
      getUrl: function () {
        return "CenterStandardPageAdmin";
      },
    },
    ConsProfileUser: {
      getUrl: function () {
        return "CenterStandardPageAdmin";
      },
    },
    CRAddressBookAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRAdvocacyAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRConnectAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRConsAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRContentAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRDataSyncAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRDonationAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRGroupAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CROrgEventAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRRecurringAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRSurveyAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    CRTeamraiserAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    Dir: {
      getUrl: function () {
        var e = "DirectoryAdmin";
        switch (luminateEdit.getQueryParam("pg")) {
          case "vprof":
            e =
              "ConsProfileAdmin?consID=" +
              luminateEdit.getQueryParam("mbr") +
              "&tabID=personal";
        }
        return e;
      },
    },
    DocServer: {
      getUrl: function () {
        return "DocumentAdmin";
      },
    },
    Donation: {
      getUrl: function () {
        var e = "DonationAdmin",
          t = luminateEdit.getQueryParam("CAMPAIGN_ID");
        return (
          null != t
            ? (e += "?ACTION=SHOW_CAMPAIGN_DETAILS&CAMPAIGN_ID=${campaignId}")
            : (e = null),
          (e = e.replace("${campaignId}", t))
        );
      },
    },
    Donation2: {
      getUrl: function () {
        var e = "Donation2Admin",
          t = luminateEdit.getQueryParam("df_id"),
          a = function (e, t, a) {
            return (
              "?don.admin=" +
              e +
              "&des_id=&action=" +
              t +
              "&dc_id=-1&df_id=${dfId}" +
              (a || "")
            );
          };
        switch (luminateEdit.getQueryParam(t + ".donation")) {
          case "form1":
          case "form2":
          case "form3":
          case "form4":
          case "form5":
            e += a("designer", "design_form", "&des_id=");
            break;
          case "completed":
            e += a("ap_thanks", "design_page", "&ap_tag=completed");
            break;
          default:
            null != t &&
              (e += "?don.admin=form_cfg&action=cfg&dc_id=-1&df_id=${dfId}");
        }
        return (e = e.replace("${dfId}", t));
      },
    },
    DynImg: {
      getUrl: function () {
        var e = "Social",
          t = luminateEdit.getQueryParam("pi");
        return (
          Number(t) <= 23
            ? (e += "?social=pi_list")
            : (e += "?social=pi_edit&progress_id=${pi}"),
          e.replace("${pi}", t)
        );
      },
    },
    Ecard: {
      getUrl: function () {
        var e = "CommCenter",
          t = luminateEdit.getQueryParam("ecard_id"),
          a = null != luminateEdit.getQueryParam("thank_you");
        return (
          (e +=
            null != t
              ? a
                ? "?email=ecard_edit5&ecard_id=${ecardId}"
                : "?email=ecard_edit3&ecard_id=${ecardId}"
              : "?email=ecard_list2"),
          (e = e.replace("${ecardId}", t))
        );
      },
    },
    Ecommerce: {
      getUrl: function () {
        var e = "EcommerceAdmin",
          t = luminateEdit.getQueryParam("store_id"),
          a = "true" == luminateEdit.getQueryParam("VIEW_PRODUCT"),
          r = "true" == luminateEdit.getQueryParam("CONFIRMATION"),
          i = luminateEdit.getQueryParam("product_id");
        return (
          a
            ? (e += "?ecommerce=prod_edit_long_desc&prod_id=${productId}")
            : null != t &&
              (e += r
                ? "?ecommerce=store_page_edit.store_edit&page_type=store_confirmation&cp_id=6_store_confirmation_${storeId}_NA&store_id=${storeId}"
                : "?ecommerce=store_edit&store_id=${storeId}"),
          (e = e.replace("${storeId}", t).replace("${productId}", i))
        );
      },
    },
    EcommerceCheckout: {
      getUrl: function () {
        return luminateEdit.servlets.Ecommerce.getUrl();
      },
    },
    GetTogether: {
      getUrl: function () {
        var e = "GetTogetherAdmin",
          t = luminateEdit.getQueryParam("cal_activity_id"),
          a = luminateEdit.getQueryParam("gettogether"),
          r = luminateEdit.getQueryParam("cal_event_id"),
          i = function (e, t) {
            return (
              "?gettogether.admin=" +
              e +
              "&page_type=" +
              t +
              "&cal_activity_id=${calActivityId}&cal_campaign_id="
            );
          };
        switch (a) {
          case "activity_splash":
            e += i("edit_activity_splash.edit.activity", "cp_activity_splash");
            break;
          case "event_list":
            e += i("edit_event_list.edit.activity", "cp_event_list");
            break;
          case "host_center":
            e += i("host_center_home.edit.hostcenter", "cp_host_center");
            break;
          case "edit_event_detail":
          case "edit_event_detail.ep":
            e += i(
              "host_center_event_detail.edit.hostcenter",
              "cp_event_detail"
            );
            break;
          case "guest_detail":
            e += i("edit_guest_detail.edit.hostcenter", "cp_guest_detail");
            break;
          case "email_center":
            e += i(
              "host_center_email_center.edit.hostcenter",
              "cp_email_center_page"
            );
            break;
          case "email_center_message":
            e +=
              "?taf_id=&gettogether.admin=edit_activity_messages&cal_activity_id=${calActivityId}&action=messages_type&cal_campaign_id=&taf_list_key_editable=";
            break;
          case "email_center_plaxo":
            e += i(
              "host_center_plaxo.edit.hostcenter",
              "cp_email_center_plaxo"
            );
            break;
          case "event_main":
            e +=
              "?gettogether.admin=cal_attendees_list&cal_event_id=${calEventId}&cal_activity_id=${calActivityId}&action=messages_type&cal_campaign_id=";
            break;
          case "change_attendee_detail":
            e += i(
              "edit_attendee_change_rsvp.edit.activity",
              "cp_change_attendee"
            );
            break;
          default:
            null != t &&
              (e +=
                "?gettogether.admin=config_activity_pages.edit&cal_activity_id=${calActivityId}&action=config_activity_pages&cal_campaign_id=");
        }
        return (e = e
          .replace("${calActivityId}", t)
          .replace("${calEventId}", r));
      },
    },
    GetTogetherSec: {
      getUrl: function () {
        var e = "GetTogetherAdmin",
          t = luminateEdit.getQueryParam("cal_activity_id"),
          a = function (e, t) {
            return (
              "?gettogether.admin=" +
              e +
              "&page_type=" +
              t +
              "&cal_activity_id=${calActivityId}&cal_campaign_id="
            );
          };
        switch (luminateEdit.getQueryParam("gettogether")) {
          case "register_host_detail":
            e += a("cust_reg_host_detail.edit.host", "cp_host_detail");
            break;
          case "register_event_detail":
            e += a(
              "cust_reg_host_event_detail.edit.host",
              "cp_reg_event_detail"
            );
            break;
          case "register_host_waiver":
            e += a("cust_reg_host_waiver.edit.host", "cp_host_waiver");
            break;
          case "register_attendee_detail":
            e += a("edit_attendee_detail.edit.activity", "cp_attendee_detail");
        }
        return (e = e.replace("${calActivityId}", t));
      },
    },
    GigyaLogin: {
      getUrl: function () {
        return "Social?social=open_auth_config";
      },
    },
    ImageLibraryPseudoServlet: {
      getUrl: function () {
        var e = "ImageLibrary",
          t = luminateEdit.tabUrl.split("/pagebuilder/")[1].split("?")[0];
        return (
          (e +=
            "?cat.filter=-1&filter_text=${imageFileName}&filter_search=Search&page_number=&lcmd=filtering&lcmd_cf=&cmd=Hide&image_type=graphic&xcode=standalone&action=selectimage&page_id=&component_index=&org="),
          (e =
            "CRTeamraiserAPI?method=&v=1.0&redirect=" +
            encodeURIComponent("../admin/" + e.replace("${imageFileName}", t)))
        );
      },
    },
    LteUser: {
      getUrl: function () {
        var e = "LteAdmin",
          t = luminateEdit.getQueryParam("lte_id"),
          a = function (e) {
            return (
              "?lte.admin=admin_pages_editor&lte_id=${lteId}" +
              (e ? "&target=" + e : "")
            );
          };
        switch (luminateEdit.getQueryParam("lte.user")) {
          case "lte_resolve_zip":
            e += a("lte_resolve_zip");
            break;
          case "lte_write_letter":
            e += a("lte_write_letter");
            break;
          case "lte_thank_you":
            e += a("lte_thank_you");
            break;
          case "lte_taf_fwd_letter":
            e += a("lte_taf_fwd_letter");
            break;
          case "lte_taf_thank_you":
            e += a("lte_taf_thank_you");
            break;
          case "lte_not_published":
            e += a("lte_not_published");
            break;
          case "lte_already_taken":
            e += a("lte_already_taken");
            break;
          case "lte_expired":
            e += a("lte_expired");
            break;
          default:
            null != t && (e += a());
        }
        return (e = e.replace("${lteId}", t));
      },
    },
    News: {
      getUrl: function () {
        return luminateEdit.servlets.News2.getUrl();
      },
    },
    News2: {
      getUrl: function () {
        var e = "News2Admin",
          t = luminateEdit.getQueryParam("id");
        switch (luminateEdit.getQueryParam("page")) {
          case "NewsArticle":
            null != t && (e += "?page=ArticleEditor&id=${articleId}");
        }
        return (e = e.replace("${articleId}", t));
      },
    },
    PageNavigator: {
      getUrl: function () {
        var e = "PageBuilderAdmin",
          t = luminateEdit.tabUrl.split(".html")[0].split("/")[
            luminateEdit.tabUrl.split("/").length - 1
          ];
        return (
          (e +=
            null != t
              ? "?filter_text=${pageName}&filter_search=Search&pagebuilder=page_list&lcmd=filtering"
              : "?pagebuilder=page_list"),
          (e = e.replace("${pageName}", t))
        );
      },
    },
    PageServer: {
      getUrl: function () {
        var e = "PageBuilderAdmin",
          t = luminateEdit.getQueryParam("pagename");
        return (
          (e +=
            null != t
              ? "?filter_text=${pageName}&filter_search=Search&pagebuilder=page_list&lcmd=filtering"
              : "?pagebuilder=page_list"),
          (e = e.replace("${pageName}", t))
        );
      },
    },
    PhotoAlbumUser: {
      getUrl: function () {
        var e = "PhotoAlbumAdmin",
          t = luminateEdit.getQueryParam("view"),
          a = luminateEdit.getQueryParam("AlbumID"),
          r = luminateEdit.getQueryParam("PhotoID");
        switch (t) {
          case "UserAlbum":
            e += "?view=AlbumCreateDetail&AlbumID=${albumId}";
            break;
          case "UserPhotoDetail":
            e += "?view=UpdatePhoto&PhotoID=${photoId}";
        }
        return (e = e.replace("${albumId}", a).replace("${photoId}", r));
      },
    },
    ReceiptRequest: {
      getUrl: function () {
        return "ReceiptAdmin";
      },
    },
    ReceiptViewer: {
      getUrl: function () {
        return luminateEdit.servlets.ReceiptRequest.getUrl();
      },
    },
    Rewards: {
      getUrl: function () {
        var e = "RewardsAdmin";
        switch (luminateEdit.getQueryParam("pg")) {
          case "rdlstcust":
            e += "?pg=rdlstcust";
            break;
          default:
            e += "?pg=rdlsta";
        }
        return e;
      },
    },
    ServiceCenter: {
      getUrl: function () {
        var e = "ServiceCenterAdmin";
        switch (luminateEdit.getQueryParam("pg")) {
          case "cancel":
            e += "?svc.admin=svc_cancel_payment";
            break;
          case "modifyamt":
            e += "?svc.admin=svc_modify_amount";
            break;
          case "skip":
            e += "?svc.admin=svc_skip_payment";
            break;
          case "changecc":
            e += "?svc.admin=svc_sustainer_change_cc";
            break;
          case "changeeft":
            e += "?svc.admin=svc_sustainer_change_eft";
        }
        return e;
      },
    },
    SPageNavigator: {
      getUrl: function () {
        return luminateEdit.servlets.PageNavigator.getUrl();
      },
    },
    SPageServer: {
      getUrl: function () {
        return luminateEdit.servlets.PageServer.getUrl();
      },
    },
    SRAdvocacyAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRConsAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRContentAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRDataSyncAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRDonationAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRGroupAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SROrgEventAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRRecurringAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRSurveyAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SRTeamraiserAPI: {
      getUrl: function () {
        return luminateEdit.common.api.getUrl();
      },
    },
    SSurvey: {
      getUrl: function () {
        return luminateEdit.servlets.Survey.getUrl();
      },
    },
    STR: {
      getUrl: function () {
        return luminateEdit.servlets.TR.getUrl();
      },
    },
    Survey: {
      getUrl: function () {
        var e = "SurveyAdmin",
          t = luminateEdit.getQueryParam("SURVEY_ID");
        return (
          (e +=
            null != t
              ? "?action=edit_survey&survey=survey_page_edit&survey_id=${surveyId}"
              : "?survey=survey_list"),
          (e = e.replace("${surveyId}", t))
        );
      },
    },
    TellAFriend: {
      getUrl: function () {
        var e = null,
          t = luminateEdit.getQueryParam("type"),
          a = luminateEdit.getQueryParam("id");
        switch (t) {
          case "2":
            e =
              "OrgEventEdit?taf_id=&event_id=${id}&action=action_configure_taf&orgevent.edit=customize_taf&taf_list_key_editable=";
            break;
          case "95":
            e = "News2Admin?page=TellAFriend&id=${id}";
            break;
          case "1019":
            e =
              "PageBuilderAdmin?page_id=${id}&pagebuilder=taf_create&version_id=";
        }
        return null != e && (e = e.replace("${id}", a)), e;
      },
    },
    Ticketing: {
      getUrl: function () {
        var e = "OrgEventEdit",
          t = luminateEdit.getQueryParam("id");
        return (
          (e += "?orgevent.edit=edit_event_information&event_id=${eventId}"),
          (e = e.replace("${eventId}", t))
        );
      },
    },
    TR: {
      getUrl: function () {
        var e = "TREdit",
          t = luminateEdit.getQueryParam("pg"),
          a = luminateEdit.getQueryParam("fr_id"),
          r = function (e) {
            return (
              "?app_id=26&page_type=" +
              e +
              "&tr=edit_event_page&action=edit_custom_page_content&fr_id=${frId}"
            );
          },
          i = function (e) {
            return (
              "?page_type=" +
              e +
              "&action=edit_custom_page_content&tr.tributes=custom_page_edit&fr_id=${frId}"
            );
          };
        switch (t) {
          case "entry":
            e += r("fr_info");
            break;
          case "pfind":
            e += r("fr_part_finder");
            break;
          case "topparticipantlist":
            e += r("fr_top_participant_list");
            break;
          case "teamlist":
            e += r("fr_team_list");
            break;
          case "complist":
            e += r("fr_company_list");
            break;
          case "informational":
            e +=
              "?page_type=fr_informational&tr=edit_informational_page&action=edit_informational_page&fr_id=${frId}&soid=" +
              luminateEdit.getQueryParam("sid");
            break;
          case "personal":
            e =
              "FriendraiserAdmin?pg=editor&type=fr_personal&fr_id=${frId}&frppid=" +
              luminateEdit.getQueryParam("px");
            break;
          case "team":
            e =
              "FriendraiserAdmin?pg=editor&type=fr_team_page&fr_id=${frId}&team_id=" +
              luminateEdit.getQueryParam("team_id");
            break;
          case "company":
            e =
              "TRManage?tr.manage=edit_local_company_page&page_type=fr_company_page&action=edit_custom_page_content&fr_id=${frId}&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "national_company":
            e +=
              "?exit_process=&page_type=fr_national_company_page&tr=edit_national_company_page_edit&action=edit_national_company_page&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "natl_co_events":
            e +=
              "?exit_process=&page_type=fr_national_top_events&tr=edit_national_company_page_edit&action=edit_national_company_page&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "natl_co_teams":
            e +=
              "?exit_process=&page_type=fr_national_top_teams&tr=edit_national_company_page_edit&action=edit_national_company_page&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "pg=natl_co_parts":
            e +=
              "?exit_process=&page_type=fr_national_top_parts&tr=edit_national_company_page_edit&action=edit_national_company_page&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "natl_co_srch":
            e +=
              "?exit_process=&page_type=fr_national_event_search&tr=edit_national_company_page_edit&action=edit_national_company_page&company_id=" +
              luminateEdit.getQueryParam("company_id");
            break;
          case "fr_ecommerce":
            e += r("fr_ecommerce_page");
            break;
          case "fr_ecommerce_search":
            e += r("fr_ecommerce_search_page");
            break;
          case "tgreeting":
            (e = "TRTributes"), (e += i("fr_tribute_greeting"));
            break;
          case "ffind":
            (e = "TRTributes"), (e += i("fr_tribute_search"));
            break;
          case "fund":
            e =
              "TRTributes?champion_editable_page=true&page_type=fr_tribute_fund&action=edit_fund_page_content&tr.tributes=fund_page_edit.Honorary&fr_id=${frId}&team_id=" +
              luminateEdit.getQueryParam("pxfid");
        }
        return (e = e.replace("${frId}", a));
      },
    },
    TRC: {
      getUrl: function () {
        var e = "TREdit",
          t = luminateEdit.getQueryParam("pg"),
          a = luminateEdit.getQueryParam("fr_id");
        switch (t) {
          case "center":
          case "settings":
          case "peditor":
          case "cpeditor":
          case "abook":
          case "mtype":
          case "taf":
          case "follow":
          case "progress":
          case "tprogress":
          case "reports":
            e +=
              "?app_id=26&page_type=fr_center&tr=edit_event_page&action=edit_custom_page_content&fr_id=${frId}";
            break;
          case "champ_mf_center":
            (e = "TRTributes"),
              (e +=
                "?page_type=champ_mf_center&action=edit_custom_page_content&tr.tributes=custom_page_edit&fr_id=${frId}");
            break;
          case "champ_center":
          case "fundup":
          case "feditor":
          case "pfabook":
          case "pfmtype":
          case "pftaf":
          case "pffollow":
          case "fprogress":
            (e = "TRTributes"),
              (e +=
                "?page_type=champ_center&action=edit_custom_page_content&tr.tributes=custom_page_edit&fr_id=${frId}");
        }
        return (e = e.replace("${frId}", a));
      },
    },
    TRR: {
      getUrl: function () {
        var e = "TREdit",
          t = luminateEdit.getQueryParam("pg"),
          a = luminateEdit.getQueryParam("fr_id"),
          r = function (e) {
            return (
              "?app_id=26&page_type=" +
              e +
              "&tr=edit_event_page&action=edit_custom_page_content&fr_id=${frId}"
            );
          },
          i = function (e) {
            return (
              "?page_type=" +
              e +
              "&action=edit_custom_page_content&tr.tributes=custom_page_edit&fr_id=${frId}"
            );
          };
        switch (t) {
          case "tfind":
            e += r("fr_team_finder");
            break;
          case "tpass":
            e += r("fr_team_password");
            break;
          case "ptype":
            e += r("fr_part_type");
            break;
          case "utype":
            e += r("fr_user_type");
            break;
          case "reg":
            e += r("fr_register");
            break;
          case "waiver":
            e += r("fr_waiver");
            break;
          case "regsummary":
            e += r("fr_reg_summary");
            break;
          case "reganother":
            e += r("fr_reg_another");
            break;
          case "paymentForm":
            e += r("fr_payment");
            break;
          case "rthanks":
            e += r("fr_thanks");
            break;
          case "tcfund":
            (e = "TRTributes"), (e += i("fr_tribute_create_fund"));
            break;
          case "temhon":
            (e = "TRTributes"), (e += i("fr_tribute_enter_memorial_honoree"));
            break;
          case "tethon":
            (e = "TRTributes"), (e += i("fr_tribute_enter_tribute_honoree"));
            break;
          case "treg":
            (e = "TRTributes"), (e += i("fr_tribute_register"));
            break;
          case "twaiver":
            (e = "TRTributes"), (e += i("fr_tribute_waiver"));
            break;
          case "trthanks":
            (e = "TRTributes"), (e += i("fr_tribute_thanks"));
        }
        return (e = e.replace("${frId}", a));
      },
    },
    TRSC: {
      getUrl: function () {
        var e = "TREdit",
          t = luminateEdit.getQueryParam("pg"),
          a = luminateEdit.getQueryParam("fr_id");
        switch (t) {
          case "ogift":
            e +=
              "?app_id=26&page_type=fr_center&tr=edit_event_page&action=edit_custom_page_content&fr_id=${frId}";
            break;
          case "pfogift":
            (e = "TRTributes"),
              (e +=
                "?page_type=champ_center&action=edit_custom_page_content&tr.tributes=custom_page_edit&fr_id=${frId}");
        }
        return (e = e.replace("${frId}", a));
      },
    },
    UserCenter: {
      getUrl: function () {
        return luminateEdit.servlets.ServiceCenter.getUrl();
      },
    },
    VoteCenter: {
      getUrl: function () {
        var e = "VoteCenterAdmin",
          t = luminateEdit.getQueryParam("page"),
          a = luminateEdit.getQueryParam("voteId");
        switch (t) {
          case "voteList":
            e += "?vote=configVoteListPage";
            break;
          case "legScore":
            e += "?repId=&vote=legScorecardPageEdit&voteId=&mode=edit";
            break;
          case "combLegScore":
            e += "?vote=combLegScorecardEdit&voteId=&mode=edit";
            break;
          case "congScorecard":
            e += "?location=S&vote=congScorecardEdit&mode=edit";
            break;
          case "voteInfo":
            e += "?vote=voteInfoPage&voteId=${voteId}";
            break;
          case "legVote":
            e += "?vote=voteLegPage&voteId=${voteId}";
            break;
          default:
            null != a && (e += "?vote=voteConfigInfo&voteId=${voteId}");
        }
        return (e = e.replace("${voteId}", a));
      },
    },
  }
};

luminateEdit.chrome = {
  checkForLuminateOnlineUrl: function (tabId, changeInfo, tab) {
    if (changeInfo.status === "loading") {
      luminateEdit.tabUrl = tab.url.replace("view-source:", "");
      var servlet = luminateEdit.getCurrentServlet();
      if (
        servlet !== null &&
        luminateEdit.servlets[servlet] &&
        luminateEdit.servlets[servlet].getUrl()
      ) {
        chrome.action.enable(tabId);
      }
    }
  },
  goToEditUrl: function () {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        luminateEdit.tabUrl = tabs[0].url.replace("view-source:", "");
        var servlet = luminateEdit.getCurrentServlet();
        if (luminateEdit.tabUrl && servlet) {
          var baseUrl = luminateEdit.tabUrl.split("/site/")[0];
          if (luminateEdit.tabUrl.indexOf("/images/content/pagebuilder/") !== -1) {
            baseUrl = luminateEdit.tabUrl.split("/images/")[0];
          }
          var targetUrl = baseUrl + "/site/" + luminateEdit.servlets[servlet].getUrl();
          chrome.tabs.create({ url: targetUrl });
        }
      }
    );
  },
};

chrome.tabs.onUpdated.addListener(luminateEdit.chrome.checkForLuminateOnlineUrl);
chrome.action.onClicked.addListener(luminateEdit.chrome.goToEditUrl);
