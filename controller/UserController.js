// save => DONE
// send email => DONE
// encrypt password => DONE
// create token => DONE
// check whether already exists or not => DONE

const nodemailer = require("nodemailer");
const UserSchema = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerUser = (req, resp) => {
    UserSchema.findOne({email: req.body.email}).then(result => {
        if (result === null) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                const user = new UserSchema({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash
                });

                user.save().then(async result => {
                    let token = jwt.sign({email: result.email, fullName: result.fullName}, process.env.PRIVATE_KEY);
                    let responseObject = {
                        message: 'user created',
                        email: result.email,
                        token: token
                    }

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.SENDER_EMAIL,
                            pass: process.env.EMAIL_APP_KEY
                        }
                    });

                    await transporter.sendMail({
                        from: '"Fred Foo 👻" <education.seekerscloud@gmail.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        text: "Registration completed", // plain text body
                        html: "<head>\n" +
                            "  <title>A Responsive Email Template</title>\n" +
                            "  <meta charset=\"utf-8\">\n" +
                            "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                            "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                            "  <style type=\"text/css\">\n" +
                            "    /* CLIENT-SPECIFIC STYLES */\n" +
                            "    #outlook a{padding:0;} /* Force Outlook to provide a \"view in browser\" message */\n" +
                            "    .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */\n" +
                            "    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */\n" +
                            "    body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */\n" +
                            "    table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */\n" +
                            "    img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */\n" +
                            "    /* RESET STYLES */\n" +
                            "    body{margin:0; padding:0;}\n" +
                            "    img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}\n" +
                            "    table{border-collapse:collapse !important;}\n" +
                            "    body{height:100% !important; margin:0; padding:0; width:100% !important;}\n" +
                            "    /* iOS BLUE LINKS */\n" +
                            "    .appleBody a {color:#68440a; text-decoration: none;}\n" +
                            "    .appleFooter a {color:#999999; text-decoration: none;}\n" +
                            "    /* MOBILE STYLES */\n" +
                            "    @media screen and (max-width: 666px) {\n" +
                            "    /* ALLOWS FOR FLUID TABLES */\n" +
                            "    /*table[class=\"wrapper\"]*/\n" +
                            "    /* ADJUSTS LAYOUT OF LOGO IMAGE */\n" +
                            "    td[class=\"logo\"]{\n" +
                            "    text-align: left;\n" +
                            "    padding: 20px 0 20px 0 !important;\n" +
                            "    }\n" +
                            "    td[class=\"logo\"] img{\n" +
                            "    margin:0 auto!important;\n" +
                            "    }\n" +
                            "    /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */\n" +
                            "    td[class=\"mobile-hide\"]{\n" +
                            "    display:none;}\n" +
                            "    img[class=\"mobile-hide\"]{\n" +
                            "    display: none !important;\n" +
                            "    }\n" +
                            "    /*img[class=\"img-max\"]*/\n" +
                            "    /* FULL-WIDTH TABLES */\n" +
                            "    /*table[class=\"responsive-table\"]*/\n" +
                            "    /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */\n" +
                            "    td[class=\"padding\"]{\n" +
                            "    padding: 10px 5% 15px 5% !important;\n" +
                            "    }\n" +
                            "    /*td[class=\"padding-copy\"]*/\n" +
                            "    td[class=\"padding-meta\"]{\n" +
                            "    padding: 30px 5% 0px 5% !important;\n" +
                            "    text-align: center;\n" +
                            "    }\n" +
                            "    td[class=\"no-pad\"]{\n" +
                            "    padding: 0 0 20px 0 !important;\n" +
                            "    }\n" +
                            "    td[class=\"no-padding\"]{\n" +
                            "    padding: 0 !important;\n" +
                            "    }\n" +
                            "    /*td[class=\"section-padding\"]*/\n" +
                            "    td[class=\"section-padding-bottom-image\"]{\n" +
                            "    padding: 50px 15px 0 15px !important;\n" +
                            "    }\n" +
                            "    /* ADJUST BUTTONS ON MOBILE */\n" +
                            "    /*td[class=\"mobile-wrapper\"]*/\n" +
                            "    table[class=\"mobile-button-container\"]{\n" +
                            "    margin:0 auto;\n" +
                            "    width:100% !important;\n" +
                            "    }\n" +
                            "    a[class=\"mobile-button\"]{\n" +
                            "    width:80% !important;\n" +
                            "    padding: 15px !important;\n" +
                            "    border: 0 !important;\n" +
                            "    font-size: 16px !important;\n" +
                            "    }\n" +
                            "    }\n" +
                            "  </style>\n" +
                            "</head>\n" +
                            "\n" +
                            "<body style=\"margin: 0; padding: 0;\">\n" +
                            "  <!-- HEADER -->\n" +
                            "  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                            "    <tbody>\n" +
                            "      <tr>\n" +
                            "        <td bgcolor=\"#FFFFFF\">\n" +
                            "          <!-- HIDDEN PREHEADER TEXT -->\n" +
                            "          <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\n" +
                            "            <p>Everyday chores just got a lot easier.</p>\n" +
                            "            ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp;\n" +
                            "            ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp;\n" +
                            "            ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp;\n" +
                            "            ‌&nbsp; ‌&nbsp; ‌&nbsp; ‌&nbsp;\n" +
                            "          </div>\n" +
                            "          <div align=\"center\" style=\"padding: 0px 15px 0px 15px;\">\n" +
                            "            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"666\" class=\"wrapper\">\n" +
                            "              <!-- LOGO/PREHEADER TEXT -->\n" +
                            "              <tbody>\n" +
                            "                <tr>\n" +
                            "                  <td style=\"padding: 30px 0px 20px 0px;\" class=\"logo\">\n" +
                            "                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                            "                      <tbody>\n" +
                            "                        <tr bgcolor=\"#FFFFFF\">\n" +
                            "                          <td>\n" +
                            "                            <center>\n" +
                            "                              <a href=\"https://www.taskrabbit.com?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1k0/6/d/575f4958dbe38.png\" width=\"200\" height=\"30\"></a>\n" +
                            "                            </center>\n" +
                            "                          </td>\n" +
                            "                        </tr>\n" +
                            "                      </tbody>\n" +
                            "                    </table>\n" +
                            "                  </td>\n" +
                            "                </tr>\n" +
                            "              </tbody>\n" +
                            "            </table>\n" +
                            "          </div>\n" +
                            "        </td>\n" +
                            "      </tr>\n" +
                            "    </tbody>\n" +
                            "  </table>\n" +
                            "\n" +
                            "\n" +
                            "  <!-- ONE COLUMN W/IMG SECTION -->\n" +
                            "  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                            "    <tbody>\n" +
                            "      <tr>\n" +
                            "        <td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 0px 15px 18px 15px;\">\n" +
                            "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"666\" class=\"responsive-table\">\n" +
                            "            <tbody>\n" +
                            "              <tr>\n" +
                            "                <td>\n" +
                            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td style=\"background-image: url(http://media.sailthru.com/53p/1k0/2/p/56cf3fd48c073.png); background-position: top center; height: 31px; background-repeat: no-repeat;\">\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/cleaning?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" \"https:=\" \" www.taskrabbit.co.uk=\" \" m=\" \" cleaning\"=\"\" target=\"_blank\" style=\"float: left; display: block; padding-left:0; width:110px; height:20px;\"></a>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/shopping-delivery?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" \"https:=\" \" www.taskrabbit.co.uk=\" \" m=\" \" shopping-delivery\"=\"\" target=\"_blank\" style=\"float: left; display: block; padding-left:34px; width:70px; height:20px;\"></a>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/handyman?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" \"https:=\" \" www.taskrabbit.co.uk=\" \" m=\" \" handyman\"=\"\" target=\"_blank\" style=\"float: left; display: block; padding-left:34px; width:115px; height:20px;\"></a>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/moving-help?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" \"https:=\" \" www.taskrabbit.co.uk=\" \" m=\" \" moving-help\"=\"\" target=\"_blank\" style=\"float: left; display: block; padding-left:34px; width:150px; height:20px;\"></a>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/gen-help?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" \"https:=\" \" www.taskrabbit.co.uk=\" \" m=\" \" gen-help\"=\"\" target=\"_blank\" style=\"float: left; display: block; padding-left:34px; width:80px; height:20px;\"></a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td align=\"center\" style=\"padding: 18px 0 0 0; border-top: 1px #CFD2D3 solid;\">\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                  <!-- HERO IMAGE -->\n" +
                            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td>\n" +
                            "                          <a href=\"https://itunes.apple.com/us/app/id374165361?mt=8\" target=\"_blank\">\n" +
                            "                            <img src=\"http://media.sailthru.com/53p/1k0/7/p/57967e61e0738.jpg\" width=\"666\" border=\"0\" alt=\"TaskRabbit Panel 1\" style=\"display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;\" class=\"img-max\">\n" +
                            "                          </a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                      <tr>\n" +
                            "                        <td>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/cleaning?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\">\n" +
                            "                            <img src=\"http://media.sailthru.com/53p/1k0/7/c/578579609a9ab.jpg\" width=\"666\" border=\"0\" alt=\"TaskRabbit Panel 2\" style=\"display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;\" class=\"img-max\">\n" +
                            "                          </a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                      <tr>\n" +
                            "                        <td>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/handyman?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\">\n" +
                            "                            <img src=\"http://media.sailthru.com/53p/1k0/7/c/57857969bdec6.jpg\" width=\"666\" border=\"0\" alt=\"TaskRabbit Panel 3\" style=\"display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;\" class=\"img-max\">\n" +
                            "                          </a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                      <tr>\n" +
                            "                        <td>\n" +
                            "                          <a href=\"https://www.taskrabbit.com/m/shopping-delivery?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\">\n" +
                            "                            <img src=\"http://media.sailthru.com/53p/1k0/7/c/578579747145e.jpg\" width=\"666\" border=\"0\" alt=\"TaskRabbit Panel 4\" style=\"display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;\" class=\"img-max\">\n" +
                            "                          </a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                      <tr>\n" +
                            "                        <td>\n" +
                            "                          <a href=\"https://www.taskrabbit.com?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\">\n" +
                            "                            <img src=\"http://media.sailthru.com/53p/1k0/7/c/5785797ea4b26.jpg\" width=\"666\" border=\"0\" alt=\"TaskRabbit Panel 5\" style=\"display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;\" class=\"img-max\">\n" +
                            "                          </a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "            </tbody>\n" +
                            "          </table>\n" +
                            "        </td>\n" +
                            "      </tr>\n" +
                            "      <!-- BEGIN HR -->\n" +
                            "      <tr>\n" +
                            "        <td align=\"center\" style=\"padding: 0 0px 0 0px;\">\n" +
                            "          <!--<td align=\"center\" style=\"padding: 0 15px 0 15px;\">-->\n" +
                            "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"666\" class=\"responsive-table\">\n" +
                            "            <tbody>\n" +
                            "              <tr>\n" +
                            "                <td>\n" +
                            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td align=\"center\" style=\"padding: 0 0 0 0; border-bottom: 1px #CFD2D3 solid;\"></td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "            </tbody>\n" +
                            "          </table>\n" +
                            "        </td>\n" +
                            "        <!-- END HR -->\n" +
                            "      </tr>\n" +
                            "    </tbody>\n" +
                            "  </table>\n" +
                            "\n" +
                            "\n" +
                            "  <!-- APP DOWNLOAD -->\n" +
                            "  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                            "    <tbody>\n" +
                            "      <tr>\n" +
                            "        <td align=\"center\">\n" +
                            "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"666\" class=\"responsive-table\">\n" +
                            "            <tbody>\n" +
                            "              <tr>\n" +
                            "                <td>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "              <tr>\n" +
                            "                <td align=\"center\">\n" +
                            "                  <table width=\"140\" height=\"27\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"responsive-table\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td align=\"center\" style=\"padding-top: 36px; padding-bottom:36px;\">\n" +
                            "                          <table width=\"140\" height=\"27\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n" +
                            "                            <tbody>\n" +
                            "                              <tr align=\"center\">\n" +
                            "                                <td width=\"33\">\n" +
                            "                                  <a href=\"https://twitter.com/taskrabbit/?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" border=\"0\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1jz/a/e/561ebb2dcaf58.png\" width=\"33\" height=\"27\" style=\"display: block;\"></a>\n" +
                            "                                </td>\n" +
                            "                                <td width=\"26\">\n" +
                            "                                  <a href=\"https://www.instagram.com/taskrabbit/?utm_campaign=NEW+Welcome+Email+1&amp;utm_medium=email&amp;utm_source=Sailthru\" border=\"0\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1jz/a/e/561ebb81140eb.png\" width=\"26\" height=\"27\" style=\"display: block;\"></a>\n" +
                            "                                </td>\n" +
                            "                                <td width=\"26\">\n" +
                            "                                  <a href=\"https://www.facebook.com/TaskRabbit/?utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" border=\"0\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1jz/a/e/561ebb4f90bfa.png\" width=\"26\" height=\"27\" style=\"display: block;\"></a>\n" +
                            "                                </td>\n" +
                            "                              </tr>\n" +
                            "                            </tbody>\n" +
                            "                          </table>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "\n" +
                            "              <tr>\n" +
                            "                <td>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "              <tr align=\"center\">\n" +
                            "                <td>\n" +
                            "                  <table width=\"140\" height=\"27\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n" +
                            "                    <tbody>\n" +
                            "                      <tr>\n" +
                            "                        <td width=\"130\" style=\"padding-right:10px;\">\n" +
                            "                          <a href=\"https://itunes.apple.com/us/app/id374165361?mt=8\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1jz/a/e/561ebac54feca.png\" width=\"130\" height=\"40\" style=\"display: block; color: #666666; font-family: Helvetica, arial, sans-serif; font-size: 13px; width: 130px; height: 40px;\" alt=\"TaskRabbit in the AppStore\"\n" +
                            "                              border=\"0\"></a>\n" +
                            "                        </td>\n" +
                            "                        <td width=\"130\" style=\"padding-left:10px;\">\n" +
                            "                          <a href=\"https://play.google.com/store/apps/details?id=com.taskrabbit.droid.consumer&amp;utm_source=Sailthru&amp;utm_medium=email&amp;utm_campaign=NEW%20Welcome%20Email%201\" target=\"_blank\"><img src=\"http://media.sailthru.com/53p/1jz/a/e/561ebafd84f13.png\" width=\"130\" height=\"40\" style=\"display: block; color: #666666; font-family: Helvetica, arial, sans-serif; font-size: 13px; width: 130px; height: 40px;\" alt=\"TaskRabbit in the Google Play Store\"\n" +
                            "                              border=\"0\"></a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </tbody>\n" +
                            "                  </table>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "\n" +
                            "\n" +
                            "            </tbody>\n" +
                            "          </table>\n" +
                            "        </td>\n" +
                            "      </tr>\n" +
                            "    </tbody>\n" +
                            "  </table>\n" +
                            "  <!-- FOOTER -->\n" +
                            "  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                            "    <tbody>\n" +
                            "      <tr>\n" +
                            "        <td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 36px 0;\">\n" +
                            "          <!-- UNSUBSCRIBE COPY -->\n" +
                            "          <table width=\"666\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"responsive-table\">\n" +
                            "            <tbody>\n" +
                            "              <tr>\n" +
                            "                <td align=\"center\" style=\"font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;\">\n" +
                            "                  <span class=\"appleFooter\" style=\"color:#666666;\">TaskRabbit - San Francisco, CA</span><br><a href=\"#\" class=\"original-only\" style=\"color: #666666; text-decoration: none;\"\n" +
                            "                    target=\"_blank\">Unsubscribe</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href=\"https://support.taskrabbit.com/hc/en-us\" class=\"original-only\" style=\"color: #666666; text-decoration: none;\" target=\"_blank\">Support</a><span class=\"original-only\"\n" +
                            "                    style=\"font-family: Arial, sans-serif; font-size: 12px; color: #444444;\">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span><a href=\"https://www.taskrabbit.com/privacy\" style=\"color: #666666; text-decoration: none;\" target=\"_blank\">Privacy Policy</a>\n" +
                            "                </td>\n" +
                            "              </tr>\n" +
                            "            </tbody>\n" +
                            "          </table>\n" +
                            "        </td>\n" +
                            "      </tr>\n" +
                            "    </tbody>\n" +
                            "  </table>\n" +
                            "\n" +
                            "</body>", // html body
                    });
                    resp.status(201).json(responseObject);
                }).catch(error => {
                    resp.status(500).json(error);
                });

            });
        } else {
            resp.status(409).json({'message': 'already exists!'});
        }
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const login = (req, resp) => {
    UserSchema.findOne({email: req.body.email}).then(result => {
        if (result !== null) {
            bcrypt.compare(req.body.password, result.password, function(err, isTokenOk) {
                if (isTokenOk){
                    let token = jwt.sign({email: result.email, fullName: result.fullName}, process.env.PRIVATE_KEY);
                    let responseObject = {
                        message: 'user Logged!',
                        email: result.email,
                        token: token
                    }
                    resp.status(200).json(responseObject);
                }else{
                    resp.status(403).json({'message': 'password not match!'});
                }
            });

        }else{
            resp.status(404).json({'message': 'email not found!'});
        }
    }).catch(errort => {
        resp.status(500).json(error);
    });
}
module.exports = {registerUser, login}