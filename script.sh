# Create by bavv@lumi.biz

codepush() {
  descriptionCode=$1;
  echo "Starting the process-----------> Code push";
  echo ""
  echo "---------------------->IOS"
  code-push release-react livestream-ios ios -m --description "$descriptionCode"
  code-push promote livestream-ios Staging Production

  echo ''
  echo "---------------------->Android"
  code-push release-react livestream-android android -m --description "$descriptionCode"
  code-push promote livestream-android Staging Production

  echo ''
  echo ''
  echo "--------------> SUCCESS"
}