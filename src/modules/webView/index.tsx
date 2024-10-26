import React from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { CommonFunctions, CommonStrings, vh } from '@inspectreplyai/utils';
import Row from '@inspectreplyai/components/general/Row';
import Column from '@inspectreplyai/components/general/Column';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import Svg from '@inspectreplyai/components/general/Svg';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import { isIOS } from '@inspectreplyai/utils/platform';
import { useRoute, RouteProp } from '@react-navigation/native';
import { endpoints } from '@inspectreplyai/network/endpoints';
import { styles } from './styles';

type WebViewerRouteParams = {
  uri?: string;
  title?: string;
};

type WebViewerRouteProp = RouteProp<{ params: WebViewerRouteParams }, 'params'>;

const WebViewer: React.FC = () => {
  const inset = useSafeAreaInsets();
  const route = useRoute<WebViewerRouteProp>();
  const { uri, title } = route.params || {};

  const shareLink = () => {
    CommonFunctions.share({
      message: uri || endpoints.webview.terms,
      onShare: () => {},
    });
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Column style={styles.container}>
      <Row style={[styles.header, { paddingTop: vh(inset.top + 15) }]}>
        <Text style={styles.title}>
          {title || CommonStrings.termsAndPrivacy}
        </Text>
        <Touchable onPress={handleGoBack} style={styles.doneButton}>
          <Text>{CommonStrings.done}</Text>
        </Touchable>
      </Row>
      <WebView
        source={{ uri: uri || endpoints.webview.terms }}
        style={styles.webView}
        bounces={false}
        cacheEnabled
        startInLoadingState
      />
      <Touchable
        onPress={shareLink}
        style={[
          styles.shareButton,
          { bottom: isIOS ? vh(inset.bottom + 10) : vh(inset.bottom + 50) },
        ]}>
        <Svg Component={SvgIcon.Share} imageStyle={styles.shareIcon} />
      </Touchable>
    </Column>
  );
};

export default WebViewer;
